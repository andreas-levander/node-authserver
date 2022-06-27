import logger from "../utils/logger.js";

const loggerMiddleware = (request, response, next) => {
  logger.http(
    `${request.method} - ${request.originalUrl} - ${request.socket.remoteAddress}`
  );

  next();
};

export default loggerMiddleware;
