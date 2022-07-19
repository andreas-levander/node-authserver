import { verifyToken } from "../services/tokens.js";
import Roles from "../schemas/roles.js";
import { NextFunction, Request, Response } from "express";
import { parseArray } from "../utils/type_helper.js";

const auth = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!request.token)
    return response.status(401).json({ error: "unauthorized" });

  const payload = await verifyToken(request.token);

  if (!payload) return response.status(401).json({ error: "unauthorized" });

  const { username, roles } = payload;

  const rolesArray = parseArray(roles, "roles");

  if (!rolesArray.includes(Roles.admin))
    return response.status(401).json({ error: "unauthorized" });

  request.user = username;

  return next();
};

export default auth;
