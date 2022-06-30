import logger from "../utils/logger.js";

const loggerMiddleware = (request, response, next) => {
  logger.http(`${request.method} - ${request.path} - ${request.ip}`);

  next();
};

export default loggerMiddleware;
