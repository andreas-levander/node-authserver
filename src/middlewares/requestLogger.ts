import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger.js";

const loggerMiddleware = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  logger.http(`${request.method} - ${request.path} - ${request.ip}`);

  next();
};

export default loggerMiddleware;
