import * as jose from "jose";
import * as logger from "../utils/logger.js";

const { publicKey, privateKey } = await jose.generateKeyPair("PS256");

const publicJwk = await jose.exportJWK(publicKey);

const kid = "asd12355435dfs53";

publicJwk.kid = kid;

const roles = Object.freeze({
  admin,
  user,
});

const createToken = async (user, roles) => {
  console.log(user, roles);
  const jwt = await new jose.SignJWT({
    roles,
  })
    .setProtectedHeader({ alg: "PS256", typ: "JWT", kid })
    .setIssuedAt()
    .setIssuer("urn:example:issuer")
    .setExpirationTime("10m")
    .sign(privateKey);

  return jwt;
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
    const { roles } = payload;
    if (roles.includes(roles.admin)) return true;

    return false;
  } catch (error) {
    logger.error(error.code);
    return false;
  }
};

export { publicJwk, createToken, verifyToken, roles };
