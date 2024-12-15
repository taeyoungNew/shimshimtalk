"use strict";
import express, { NextFunction, Request, Response } from "express";
import userRouter from "./routes/usersRouter";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { json } from "express";
import { errorHandler } from "./middlewares/errorHandler.middleware";

const app = express();
const PORT = 3001;

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(json());
// app.use(session({}));s

app.use("/api", [userRouter]);
// 모든 곳에서 발생하는 에러를 catch
app.use(errorHandler);
app.all(/(.*)/, (error: Error) => {
  console.log("index = ", error.message);
  throw new Error(error.message);
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT} 빌드안해도 ts가 바로 실행이 되는데?`);
});
