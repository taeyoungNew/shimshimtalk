import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import logger from "../config/logger";
export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`${error.message}`);
  console.log("에러 메세지 = ", error.message);
  return res.status(400).json({ message: error.message });
};
