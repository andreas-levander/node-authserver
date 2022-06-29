import winston from "winston";
import "winston-daily-rotate-file";

const { combine, timestamp, printf, label, colorize } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: "debug",
  format: combine(
    label({ label: "authserver" }),
    timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    myFormat,
    colorize()
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: "authserver-%DATE%.log",
      dirname: "./logs",
      frequency: "24h",
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
    // might remove for production
    new winston.transports.Console({
      format: combine(myFormat, colorize()),
    }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== "production") {
//   logger.add(
//     new winston.transports.Console({
//       format: combine(myFormat, colorize()),
//     })
//   );
// }

export default logger;
