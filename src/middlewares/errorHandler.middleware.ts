import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import logger from "../config/logger";
import { AppError } from "../errors/AppError";
export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`${error.message}`);
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
      ...(error.data && { data: error.data }),
    });
  }

  return res
    .status(500)
    .json({ status: "error", message: "Internal Server Error" });
};
