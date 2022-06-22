import express from "express";
import { createToken, publicJwk } from "../controllers/auth.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const publicRouter = express.Router();

publicRouter.get("/validate", (request, response) => {
  response.status(200).json({ keys: [publicJwk] });
});

publicRouter.get("/test", async (request, response) => {
  // For testing only
  response.status(200).json({ key: await createToken() });
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
});

export default publicRouter;
