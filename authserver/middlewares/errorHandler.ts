import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger.js";

const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.error(error.message);

  //   if (error.name === "CastError") {
  //     return response.status(400).send({ error: "malformatted id" });
  //   } else if (error.name === "ValidationError") {
  //     return response.status(400).json({ error: error.message });
  //   } else if (error.name === "JsonWebTokenError") {
  //     return response.status(401).json({ error: "invalid token" });
  //   }

  next(error);
};

export default errorHandler;
