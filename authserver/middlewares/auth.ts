import { verifyToken } from "../services/tokens.js";
import Roles from "../schemas/roles.js";
import { NextFunction, Request, Response } from "express";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (str: unknown, parameter: string): string => {
  if (!str || !isString(str)) {
    throw new Error(`Incorrect or missing ${parameter}: ` + str);
  }
  return str;
};

const parseArray = (arr: unknown): any[] => {
  if (!Array.isArray(arr)) {
    throw new Error("roles is not an array");
  }
  return arr;
};

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

  const usernameString = parseString(username, "username");
  const rolesArray = parseArray(roles);

  if (!rolesArray.includes(Roles.admin))
    return response.status(401).json({ error: "unauthorized" });

  request.user = usernameString;

  next();
};

export default auth;
