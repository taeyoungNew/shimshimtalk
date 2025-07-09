import { NextFunction, Request, Response } from "express";
import { LoginDto } from "../dtos/loginDto";
// import userRedisClient from "../common/cache/userIdCache";
import { accessToken } from "../middlewares/common/accToken";
import { refreshToken } from "../middlewares/common/refToken";
import userCache from "../common/cache/userIdCache";
import UserService from "../service/usersService";
import AuthService from "../service/authService";
import logger from "../config/logger";
import bcrypt from "bcrypt";

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

      // cache에 유저id저장
      await userCache.set("userId", JSON.stringify(getUserInfo.id));
      await userCache.set("email", JSON.stringify(getUserInfo.email));
      await userCache.set(
        "userNickname",
        JSON.stringify(getUserInfo.UserInfo.nickname)
      );
      console.log("redis- userId = ", await userCache.get("userId"));

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
      await userCache.del("userId");
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
      if (authorization === undefined || authorization === null)
        return res.status(401).json({
          isLogin: false,
        });
      return res.status(200).json({
        isLogin: true,
        id: await userCache.get("userId"),
        email: await userCache.get("email"),
        nickname: await userCache.get("userNickname"),
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
    if (!result) throw new Error("패스워드가 일치하지않습니다.");
  };
}

export default AuthHandler;
