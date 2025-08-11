"use strict";
import express, { NextFunction, Request, Response } from "express";
import router from "./routes/index";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cacheConnetion from "./common/cacheLocal/index";
import morganMiddleware from "./middlewares/morgan";
import logger from "./config/logger";
import morgan from "morgan";
import { json } from "express";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const PORT = 3001;
dotenv.config();

app.use(cors({ origin: process.env.FRONT_CORS, credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(json());
app.use("/api", router);

// 모든 곳에서 발생하는 에러를 catch
app.use(errorHandler);
app.use(cacheConnetion);
app.use(
  morgan("combined", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);
app.use(morganMiddleware);
app.all(/(.*)/, (error: Error) => {
  throw new Error(error.message);
});

app.listen(PORT, () => {
  logger.info("심심톡 실행 PORT: ${PORT}");
});
