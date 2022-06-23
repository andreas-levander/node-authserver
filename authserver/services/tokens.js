import * as jose from "jose";
import * as logger from "../utils/logger.js";
import crypto from "crypto";
import { KEY_GEN_ALG } from "../utils/config.js";

const { publicKey, privateKey } = await jose.generateKeyPair(KEY_GEN_ALG);

const publicJwk = await jose.exportJWK(publicKey);

const kid = crypto.randomUUID();

publicJwk.kid = kid;

const roles = Object.freeze({
  admin: "admin",
  user: "user",
});

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
    const token_roles = payload.roles;

    //verifies user is admin
    if (token_roles.includes(roles.admin)) return true;

    return false;
  } catch (error) {
    logger.error(`Token verification error code: ${error.code}`);
    return false;
  }
};

export { publicJwk, createToken, verifyToken, roles };
