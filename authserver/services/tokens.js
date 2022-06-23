import * as jose from "jose";
import * as logger from "../utils/logger.js";

const { publicKey, privateKey } = await jose.generateKeyPair("PS256");

const publicJwk = await jose.exportJWK(publicKey);

const kid = "asd12355435dfs53";

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
    .setProtectedHeader({ alg: "PS256", typ: "JWT", kid })
    .setIssuedAt()
    .setIssuer("urn:example:issuer")
    .setExpirationTime("10m")
    .sign(privateKey);
};

const verifyToken = async (token) => {
  try {
    const { payload, protectedHeader } = await jose.jwtVerify(
      token,
      publicKey,
      {
        issuer: "urn:example:issuer",
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
