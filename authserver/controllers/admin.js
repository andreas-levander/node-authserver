import express from "express";
import User from "../models/User.js";
import * as admin from "../services/user.js";
import newUserValidate from "../schemas/validation/newUser.js";
import removeUserValidate from "../schemas/validation/removeUser.js";

const adminRouter = express.Router();

adminRouter.post("/createuser", async (request, response) => {
  if (!newUserValidate(request.body))
    return response
      .status(400)
      .json({ message: "Incorrect input", error: newUserValidate.errors });

  const { username, roles } = request.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: "username must be unique",
    });
  }

  const newuser = await admin.createUser(username, roles);

  return response.status(200).json({ message: "new user created", newuser });
});

adminRouter.post("/removeuser", async (request, response) => {
  if (!removeUserValidate(request.body))
    return response
      .status(400)
      .json({ message: "Incorrect input", error: removeUserValidate.errors });

  const { username } = request.body;

  await User.deleteOne({ username });

  return response.status(200).json({ message: `Removed user: ${username}` });
});

export default adminRouter;
