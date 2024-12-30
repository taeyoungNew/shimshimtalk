import { Request, Response, NextFunction } from "express";
// 로그아웃을 이미 하고이는지 확인하는 미들웨어
// 되어있으면 에러반환
// 어차피 로그아웃한 상태에서 로그아웃을  다시하려고 할때 거르는 용도로만 쓰일것임

export const isLogoutMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.cookies.authorization === undefined)
      throw new Error("현재 로그인한 상태가 아닙니다. ");
    next();
  } catch (error) {
    throw error;
  }
};
