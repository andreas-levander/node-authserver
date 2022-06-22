import express from "express";
import { verifyToken } from "../controllers/auth.js";
import User from "../models/User.js";
import * as admin from "../controllers/admin.js";

const adminRouter = express.Router();

adminRouter.post("/createuser", async (request, response) => {
  if (!request.token)
    return response.status(401).json({ error: "no or bad token in request" });
  if (await verifyToken(request.token)) {
    if (request.get("Content-Type") !== "application/json")
      return response
        .status(404)
        .json({ error: "request needs to be application/json" });

    const { username, roles } = request.body;

    if (!username || !roles) {
      return response.status(400).json({ error: "username or roles missing" });
    }

    if (username.length < 4) {
      return response.status(400).json({
        error: "username must be atleast 3 characters long",
      });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return response.status(400).json({
        error: "username must be unique",
      });
    }

    const newuser = await admin.createUser(username, roles);

    return response.status(200).json({ message: "new user created", newuser });
  } else return response.status(401).json({ error: "unauthorized" });
});

export default adminRouter;
