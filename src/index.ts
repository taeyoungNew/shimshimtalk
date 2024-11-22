"use strict";
import express, { NextFunction, Request, Response } from "express";
import userRouter from "./routes/usersRouter";
import { json } from "express";
import bodyParser from "body-parser";
import { errorHandler } from "./middlewares/errorHandler.middleware";

const app = express();
const PORT = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(json());

app.use("/api", [userRouter]);
// 모든 곳에서 발생하는 에러를 catch
app.all(/(.*)/, (error: Error) => {
  // console.log(error);
  throw new Error(error.message);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT} 빌드안해도 ts가 바로 실행이 되는데?`);
});
