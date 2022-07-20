import express from "express";
import User from "../models/User.js";
import * as admin from "../services/user.js";
import logger from "../utils/logger.js";
import {
  newUserBodyValidator,
  NewUserRequestSchema,
} from "../schemas/validation/newUser.js";
import { ValidatedRequest } from "express-joi-validation";
import {
  removeUserBodyValidator,
  RemoveUserRequestSchema,
} from "../schemas/validation/removeUser.js";

const adminRouter = express.Router();

adminRouter.post(
  "/createuser",
  newUserBodyValidator,
  async (request: ValidatedRequest<NewUserRequestSchema>, response) => {
    const { username, roles } = request.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return response.status(400).json({
        error: "username must be unique",
      });
    }

    const newuser = await admin.createUser(username, roles);

    logger.info(
      `${request.user} created new user: ${username}, roles: ${roles}`
    );

    return response.status(200).json({ message: "new user created", newuser });
  }
);

adminRouter.post(
  "/removeuser",
  removeUserBodyValidator,
  async (request: ValidatedRequest<RemoveUserRequestSchema>, response) => {
    const { username } = request.body;

    await User.deleteOne({ username });

    logger.info(`${request.user} removed user: ${username}`);

    return response.status(200).json({ message: `Removed user: ${username}` });
  }
);

export default adminRouter;
