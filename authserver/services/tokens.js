import * as jose from "jose";
import logger from "../utils/logger.js";
import crypto from "crypto";
import { KEY_GEN_ALG, KEY_TTL, TOKEN_TTL } from "../utils/config.js";
import { redisClient } from "../app.js";

const getRandomPrivateKey = async () => {
  const keys = await redisClient.keys("privateKey:*");
  if (keys.length < 1) {
    return await generateKeyPair();
  }
  const randomKey = keys[~~(Math.random() * keys.length)];
  const randomPrivateKey = await redisClient.get(randomKey);
  return {
    privateKey: await jose.importPKCS8(randomPrivateKey, KEY_GEN_ALG),
    kid: randomKey.slice(11),
  };
};

const getPublicKeys = async () => {
  const publickeys = await redisClient.keys("publicKey:*");

  return await Promise.all(
    publickeys.map(async (key) =>
      JSON.parse(await redisClient.get(`publicKey:${key.slice(10)}`))
    )
  );
};

const generateKeyPair = async () => {
  const { publicKey, privateKey } = await jose.generateKeyPair(KEY_GEN_ALG);

  const publicKeyExport = await jose.exportJWK(publicKey);
  const privateKeyExport = await jose.exportPKCS8(privateKey);

  const kid = crypto.randomUUID();

  publicKeyExport.kid = kid;

  await redisClient.set(`publicKey:${kid}`, JSON.stringify(publicKeyExport), {
    EX: KEY_TTL + Math.floor(TOKEN_TTL / 60),
  });
  await redisClient.set(`privateKey:${kid}`, privateKeyExport, { EX: KEY_TTL });

  return { publicKey, privateKey, kid };
};

const createToken = async ({ username, roles }) => {
  const { privateKey, kid } = await getRandomPrivateKey();
  return await new jose.SignJWT({
    roles,
    username,
  })
    .setProtectedHeader({ alg: KEY_GEN_ALG, typ: "JWT", kid })
    .setIssuedAt()
    .setIssuer("authserver")
    .setExpirationTime(`${TOKEN_TTL}m`)
    .sign(privateKey);
};

const verifyToken = async (token) => {
  const claims = jose.decodeProtectedHeader(token);
  const publicKey = await jose.importJWK(
    JSON.parse(await redisClient.get(`publicKey:${claims.kid}`)),
    KEY_GEN_ALG
  );

  try {
    const { payload, protectedHeader } = await jose.jwtVerify(
      token,
      publicKey,
      {
        issuer: "authserver",
      }
    );

    return payload;
  } catch (error) {
    logger.warn(`Token verification error code: ${error.code}`);
    return false;
  }
};

export { getPublicKeys, createToken, verifyToken };
