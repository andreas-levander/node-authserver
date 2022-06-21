import express from "express";
import eae from "express-async-errors";
import cors from "cors";
import mongoose from "mongoose";
import { MONGODB_URI } from "./utils/config.js";
import authRouter from "./controllers/auth.js";

const app = express();

// logger.info("connecting to", MONGODB_URI);

// mongoose
//   .connect(MONGODB_URI)
//   .then(() => {
//     logger.info("connected to MongoDB");
//   })
//   .catch((error) => {
//     logger.error("error connection to MongoDB:", error.message);
//   });

app.use(cors());
app.use(express.json());
// //app.use(tokenExtractor);
// app.use("/api/blogs", userExtractor, blogRouter);
// app.use("/api/users", usersRouter);
app.use("/v1/api/auth", authRouter);

//app.use(errorHandler);

export default app;
