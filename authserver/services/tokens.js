import * as jose from "jose";
import logger from "../utils/logger.js";
import crypto from "crypto";
import { KEY_GEN_ALG } from "../utils/config.js";
import roles from "../schemas/roles.js";

const { publicKey, privateKey } = await jose.generateKeyPair(KEY_GEN_ALG);

const publicJwk = await jose.exportJWK(publicKey);

const kid = crypto.randomUUID();

publicJwk.kid = kid;

const createToken = async ({ username, roles }) => {
  console.log(`created token: ${username}, ${roles}`);
  return await new jose.SignJWT({
    roles,
    username,
  })
    .setProtectedHeader({ alg: KEY_GEN_ALG, typ: "JWT", kid })
    .setIssuedAt()
    .setIssuer("authserver")
    .setExpirationTime("10m")
    .sign(privateKey);
};

const verifyToken = async (token) => {
  try {
    const { payload, protectedHeader } = await jose.jwtVerify(
      token,
      publicKey,
      {
        issuer: "authserver",
      }
    );

    console.log(payload);
    console.log(protectedHeader);

    return payload;
  } catch (error) {
    logger.warn(`Token verification error code: ${error.code}`);
    return {};
  }
};

export { publicJwk, createToken, verifyToken };
