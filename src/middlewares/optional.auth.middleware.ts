import { Request, Response, NextFunction } from "express";
import { tokenType } from "../types/tokenType";
import logger from "../config/logger";
import verifyAccToken from "./common/varifyAccToken";
export const optionalAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info("", {
    layer: "middleware",
    functionName: "optionalMiddleware",
  });

  const authorization = req.cookies.authorization;
  if (!authorization) {
    next();
  }
  try {
    const [tokenType, token] = authorization.split(" ");

    const accTokenPayment: tokenType = {
      token: token,
      type: "accToken",
    };

    const decodeAccToken = verifyAccToken(accTokenPayment);

    // 만료가 안되었을 경우
    if (typeof decodeAccToken === "object") {
      // 다음 모듈에 유저의 정보를 넘긴다.
      res.locals.userInfo = decodeAccToken;
    }
    next();
  } catch (error) {
    res.locals.userInfo = null;
    next();
  }
};
