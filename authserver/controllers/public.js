import express from "express";
import { createToken, getPublicKeys } from "../services/tokens.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import roles from "../schemas/roles.js";
import logger from "../utils/logger.js";

const publicRouter = express.Router();

publicRouter.get("/validate", async (request, response) => {
  response.status(200).json({ keys: await getPublicKeys() });
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
  let { username, password } = request.body;

  if (!username || !password) {
    ({ username, password } = request.query);
  }

  if (!username || !password)
    return response.status(400).json({
      error: "username or password missing",
    });

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  logger.info(`${username} logged in`);

  response.status(200).json({
    token: await createToken({
      username,
      roles: user.roles,
    }),
  });
});

export default publicRouter;
