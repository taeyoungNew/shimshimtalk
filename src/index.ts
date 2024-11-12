"use strict";
import express, { NextFunction, Request, Response } from "express";
import userRouter from "./routes/usersRouter";
import { json } from "express";

const app = express();
const PORT = 3001;

app.use("/api", [userRouter]);
app.use(json());

// app.get("/", (req: Request, res: Response): Promise<any> => {
//   // return res.status(200).send("홈페이지");
//   res.status(200).send("홈페이지");
// });

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT} 빌드안해도 ts가 바로 실행이 되는데?`);
});
