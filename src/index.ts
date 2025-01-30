"use strict";
import express, { NextFunction, Request, Response } from "express";
import router from "./routes/index";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cacheConnetion from "./common/cache/index";
import morganMiddleware from "./middlewares/morgan";
import logger from "./config/logger";
import morgan from "morgan";
import { json } from "express";
import { errorHandler } from "./middlewares/errorHandler.middleware";

const app = express();
const PORT = 3001;

// userRedisClient.connect().catch(console.error);
// userRedisClient.on("ready", () => {
//   console.log("redis is ready");
// });

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
  logger.info("심심톡 실행");
  console.log(`Running on Port ${PORT} 빌드안해도 ts가 바로 실행이 되는데?`);
});
