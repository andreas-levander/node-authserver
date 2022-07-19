import * as jose from "jose";
import logger from "../utils/logger.js";
import crypto from "crypto";
import { JWTClaimValidationFailed } from "../../node_modules/jose/dist/types/util/errors.js";
import { KEY_GEN_ALG, KEY_TTL, TOKEN_TTL } from "../utils/config.js";
import { redisClient } from "../app.js";

const getRandomPrivateKey = async () => {
  const keys = await redisClient.keys("privateKey:*");
  if (keys.length < 1) {
    return await generateKeyPair();
  }
  const randomKey = keys[~~(Math.random() * keys.length)];
  const randomPrivateKey = await redisClient.get(randomKey);
  if (!randomPrivateKey) throw new Error("error getting privatekey from redis");
  return {
    privateKey: await jose.importPKCS8(randomPrivateKey, KEY_GEN_ALG),
    kid: randomKey.slice(11),
  };
};

const getPublicKeys = async () => {
  const publickeys = await redisClient.keys("publicKey:*");

  return await Promise.all(
    publickeys.map(async (key) => await getPublicKey(key.slice(10)))
  );
};

const getPublicKey = async (kid: string): Promise<jose.JWK> => {
  const publickey = await redisClient.get(`publicKey:${kid}`);
  if (!publickey) throw new Error(`error getting publickey ${kid}`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const parse: jose.JWK = JSON.parse(publickey);
  return parse;
};

const generateKeyPair = async () => {
  const { publicKey, privateKey } = await jose.generateKeyPair(KEY_GEN_ALG);

  const publicKeyExport = await jose.exportJWK(publicKey);
  const privateKeyExport = await jose.exportPKCS8(privateKey);

  const kid = crypto.randomUUID();

  publicKeyExport.kid = kid;

  await redisClient.set(`publicKey:${kid}`, JSON.stringify(publicKeyExport), {
    EX: KEY_TTL + TOKEN_TTL * 60,
  });
  await redisClient.set(`privateKey:${kid}`, privateKeyExport, { EX: KEY_TTL });

  return { publicKey, privateKey, kid };
};

const createToken = async ({
  username,
  roles,
}: {
  username: string;
  roles: string[];
}) => {
  const { privateKey, kid } = await getRandomPrivateKey();
  return await new jose.SignJWT({
    roles,
    sub: username,
  })
    .setProtectedHeader({ alg: KEY_GEN_ALG, typ: "JWT", kid })
    .setIssuedAt()
    .setIssuer("authserver")
    .setExpirationTime(`${TOKEN_TTL}m`)
    .sign(privateKey);
};

const verifyToken = async (token: string) => {
  const claims = jose.decodeProtectedHeader(token);
  if (!claims.kid) throw new Error("no kid in token");
  const publicKey = await jose.importJWK(
    await getPublicKey(claims.kid),
    KEY_GEN_ALG
  );

  try {
    const { payload } = await jose.jwtVerify(token, publicKey, {
      issuer: "authserver",
    });
    const { sub, roles } = payload;
    return { username: sub, roles };
  } catch (error) {
    logger.warn(
      `Token verification error code: ${
        (error as JWTClaimValidationFailed).code
      }`
    );
    return false;
  }
};

export { getPublicKeys, createToken, verifyToken };
