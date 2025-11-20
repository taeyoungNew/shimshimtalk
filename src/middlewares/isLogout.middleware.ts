import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";
import { CustomError } from "../errors/customError";
import errorCodes from "../constants/error-codes.json";

// 로그아웃을 이미 하고이는지 확인하는 미들웨어
// 되어있으면 에러반환
// 어차피 로그아웃한 상태에서 로그아웃을  다시하려고 할때 거르는 용도로만 쓰일것임

export const isLogoutMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info("", {
      layer: "middlerware",
      functionName: "isLogoutMiddleware",
    });

    if (req.cookies.authorization === undefined)
      throw new CustomError(
        errorCodes.AUTH.UNAUTHORIZED.status,
        errorCodes.AUTH.UNAUTHORIZED.code,
        "현재 로그인한 상태가 아닙니다."
      );
    next();
  } catch (error) {
    throw error;
  }
};
