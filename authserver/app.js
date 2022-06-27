import express from "express";
// eslint-disable-next-line no-unused-vars
import eae from "express-async-errors";
import cors from "cors";
import mongoose from "mongoose";
import { MONGODB_URI } from "./utils/config.js";
import publicRouter from "./controllers/public.js";
import adminRouter from "./controllers/admin.js";
import tokenExtractor from "./middlewares/tokenExtractor.js";
import requestLogger from "./middlewares/requestLogger.js";
import logger from "./utils/logger.js";
import errorHandler from "./middlewares/errorHandler.js";
import auth from "./middlewares/auth.js";
import helmet from "helmet";

const app = express();

logger.info("connecting to MongoDB", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

//app.use(helmet());

//app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use("/v1/api/admin", tokenExtractor, auth, adminRouter);
app.use("/v1/api/public", publicRouter);

app.use(function (req, res) {
  //Capture All 404 errors
  res.status(404).end();
});

app.use(errorHandler);

export default app;
