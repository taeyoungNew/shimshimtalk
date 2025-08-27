import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import logger from "../config/logger";
import { CustomError } from "../errors/customError";
import errorCodes from "../constants/error-codes.json";
export const errorHandler: ErrorRequestHandler = (
  error: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`${error.message}`);
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({
      status: error.statusCode,
      errorCode: error.errorCode,
      message: error.message,
    });
  }

  // 예상 못한 에러 → 공통 에러로 응답
  return res.status(500).json({
    status: 500,
    errorCode: errorCodes.COMMON.INTERNAL_ERROR,
    message: "서버 내부 오류가 발생했습니다.",
  });
};
