import * as logger from "../utils/logger.js";

const loggerMiddleware = (request, response, next) => {
  logger.info(
    `${request.method} - ${request.originalUrl} - ${request.socket.remoteAddress}`
  );

  next();
};

export default loggerMiddleware;
