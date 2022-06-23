import express from "express";
import { createToken, publicJwk } from "../services/tokens.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import roles from "../schemas/roles.js";

const publicRouter = express.Router();

publicRouter.get("/validate", (request, response) => {
  response.status(200).json({ keys: [publicJwk] });
});

publicRouter.get("/test", async (request, response) => {
  // For testing only
  response.status(200).json({
    key: await createToken({
      username: "testuser",
      roles: [roles.admin, roles.user],
    }),
  });
});

publicRouter.post("/login", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  response.status(200).json({
    key: await createToken({
      username,
      roles: user.roles,
    }),
  });
});

export default publicRouter;
