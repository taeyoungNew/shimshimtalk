import { isJWT } from "validator";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { checkAuth } from "../middlewares/common/checkAuth";

module.exports = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // acctoken의 유무를 확인
    //  -> 없으면 로그인하라는 에러와 함께 로그인화면으로 go
    const { authorization } = req.cookies;
    if (authorization) {
      checkAuth(authorization);
    }

    // acctoken이 유효한지 확인
    //  -> 유효하지않으면 reftoken을 확인하고

    //    -> reftoken도 유효하지않으면 로그인하라는 에러와 함께 로그인화면으로 go
    // -> 유요하면 인가를 받음
  } catch (error) {}
};
