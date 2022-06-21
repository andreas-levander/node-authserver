import express from "express";
import * as jose from "jose";

const authRouter = express.Router();

const { publicKey, privateKey } = await jose.generateKeyPair("PS256");

const publicJwk = await jose.exportJWK(publicKey);

const kid = "asd12355435dfs53";

publicJwk.kid = kid;

authRouter.get("/token", async (request, response) => {
  const jwt = await new jose.SignJWT({
    "urn:example:claim": true,
    roles: ["user"],
  })
    .setProtectedHeader({ alg: "PS256", typ: "JWT", kid })
    .sign(privateKey);

  response.status(200).json(jwt);
});

authRouter.get("/validate", (request, response) => {
  response.status(200).json({ keys: [publicJwk] });
});

export default authRouter;
