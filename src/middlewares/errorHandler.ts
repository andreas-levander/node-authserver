import { NextFunction, Request, Response } from "express";
import { ExpressJoiError } from "express-joi-validation";
import logger from "../utils/logger.js";

const errorHandler = (
  error: any | ExpressJoiError,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  if (error && error.error && error.error.isJoi) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const e: ExpressJoiError = error;
    // e.g "you submitted a bad query"
    let msg = "unknown";
    if (e.error) msg = e.error.message.replaceAll('"', "");
    return response.status(400).json({
      error: `You submitted a bad ${e.type} paramater.`,
      message: msg,
    });
  } else {
    logger.error(error?.message);
    return response.status(500).end("internal server error");
  }
};

export default errorHandler;
