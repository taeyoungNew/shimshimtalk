import { NextFunction, Request, Response } from "express";
import { LoginDto } from "../dtos/loginDto";
// import userRedisClient from "../common/cache/userIdCache";
import { accessToken } from "../middlewares/common/accToken";
import { refreshToken } from "../middlewares/common/refToken";
import { userCache } from "../common/cacheLocal/userIdCache";
import UserService from "../service/usersService";
import AuthService from "../service/authService";
import logger from "../config/logger";
import bcrypt from "bcrypt";
import { CustomError } from "../errors/customError";
import errorCodes from "../constants/error-codes.json";
import { error } from "console";

class AuthHandler {
  userService = new UserService();
  authService = new AuthService();
  /**
   * ログインAPI
   *
   * @param req email & pw
   * @param res
   * @param next
   * @returns accToken refToken
   */
  public loginUser = async (
    req: Request<{}, {}, LoginDto>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;

    try {
      logger.info("", {
        method: "post",
        url: "api/auth/login",
        layer: "Handlers",
        className: "AuthHandler",
        functionName: "loginUser",
      });
      // 로그인정보로 회원유무확인
      const getUserInfo = await this.userService.findUserByEmail(email);
      // 패스워드확인
      this.validPassword(password, getUserInfo.password);

      // acc & ref token생성
      const accToken: string = accessToken(getUserInfo.id, getUserInfo.email);

      // refToken 생성
      const refToken: string = refreshToken(getUserInfo.id, getUserInfo.email);

      // refToken 저장
      await this.authService.saveRefToken(refToken, getUserInfo.id);

      const loginUserInfo = {
        id: getUserInfo.id,
        email: getUserInfo.email,
        userNickname: getUserInfo.UserInfo.nickname,
      };

      // cache에 유저id저장
      await userCache.set(`token:${accToken}`, JSON.stringify(loginUserInfo));

      // accToken쿠기에 담기
      res.cookie("authorization", `Bearer ${accToken}`, {
        sameSite: "strict",
        httpOnly: true,
      });
      logger.info("로그인되었습니다.", {
        status: 200,
        user: getUserInfo.email,
        method: "post",
        uer: "api/auth/login",
      });
      return res.status(200).json({
        message: "로그인되었습니다. ",
        data: {
          id: getUserInfo.id,
          email: getUserInfo.email,
          nickname: getUserInfo.UserInfo.nickname,
        },
      });
    } catch (e) {
      next(e);
    }
  };
  /**
   * ログアウAPI
   *
   * @param req
   * @param res
   * @param next
   * @returns
   */
  public logoutUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("", {
        method: "post",
        url: "api/auth/login",
        layer: "Handlers",
        className: "AuthHandler",
        functionName: "logoutUser",
      });
      const { authorization } = req.cookies;
      const [tokenType, token] = authorization.split(" ");
      await userCache.del(`token:${token}`);
      res.clearCookie("authorization");
      logger.info("로그아웃되었습니다.", {
        status: 200,
        method: "post",
        uer: "api/auth/logput",
      });
      return res.status(200).json({
        message: "로그아웃되었습니다. ",
      });
    } catch (e) {
      next(e);
    }
  };

  public authMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("", {
        method: "post",
        url: "api/auth/auth-me",
        layer: "Handlers",
        className: "AuthHandler",
        functionName: "authMe",
      });
      const { authorization } = req.cookies;
      const [tokenType, token] = authorization.split(" ");
      if (authorization === undefined || authorization === null)
        return res.status(401).json({
          isLogin: false,
        });

      const getUserLoginInfo = JSON.parse(
        await userCache.get(`token:${token}`)
      );

      return res.status(200).json({
        isLogin: true,
        user: {
          id: getUserLoginInfo.id,
          email: getUserLoginInfo.email,
          nickname: getUserLoginInfo.userNickname,
        },
      });
    } catch (e) {
      next(e);
    }
  };

  /**
   * PW確認モジュール
   *
   * @param password 入力パスワード
   * @param exPassword DB上のパスワード
   *
   */
  public validPassword = (password: string, exPassword: string) => {
    const result = bcrypt.compareSync(password, exPassword);
    if (!result)
      throw new CustomError(
        errorCodes.AUTH.PASSWORD_INVALID.status,
        errorCodes.AUTH.PASSWORD_INVALID.code,
        "패스워드가 일치하지않습니다."
      );
  };
}

export default AuthHandler;
