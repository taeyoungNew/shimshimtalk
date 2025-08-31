import { Response, Request, NextFunction } from "express";
import UserService from "../service/usersService";
import FollowService from "../service/followService";
import logger from "../config/logger";
import { SignupDto, ModifyUserDto, GetBlockedUsersDto } from "../dtos/userDto";
import {
  emailExp,
  passwordExp,
  nicknameExp,
  aboutMeExp,
  ageExp,
  username,
} from "../common/validators/userExp";
import errorCodes from "../constants/error-codes.json";
import { CustomError } from "../errors/customError";

class UserHandler {
  userService = new UserService();
  followService = new FollowService();
  /**
   * 회원가입
   *
   * @param req
   * @param res
   * @param next
   * @returns
   */
  public createUser = async (
    req: Request<{}, {}, SignupDto, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("", {
        method: "post",
        url: "api/user/signup",
        layer: "Handlers",
        className: "UserHandler",
        functionName: "createUser",
      });
      const { email, password, aboutMe, age, nickname, username } = req.body;
      if (!emailExp(email))
        throw new CustomError(
          errorCodes.AUTH.EMAIL_INVALID.status,
          errorCodes.AUTH.EMAIL_INVALID.code,
          "이메일형식이 맞지 않습니다. "
        );

      if (!passwordExp(password))
        throw new CustomError(
          errorCodes.AUTH.PASSWORD_INVALID.status,
          errorCodes.AUTH.PASSWORD_INVALID.code,
          "패스워드형식이 맞지 않습니다. "
        );

      if (!nicknameExp(nickname))
        throw new CustomError(
          errorCodes.USER.NICKNAME_INVALID.status,
          errorCodes.USER.NICKNAME_INVALID.code,
          "닉네임형식에 맞지않습니다."
        );

      const signupInfo: SignupDto = {
        email,
        password,
        aboutMe,
        age,
        nickname,
        username,
      };
      await this.userService.createUser(signupInfo);
      return res.status(200).json({ message: "회원가입이 완료되었습니다. " });
    } catch (e) {
      next(e);
    }
  };

  /**
   * 모든 회원정보리스트
   *
   * @param req
   * @param res
   * @param next
   * @returns 프로필, 닉네임, id
   *
   *
   */
  public findAllUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("", {
        method: "get",
        url: "api/user/",
        layer: "Handlers",
        className: "UserHandler",
        functionName: "findAllUser",
      });
      const result = await this.userService.findAllUser();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
  /**
   * 자신의 정보가져오기
   *
   * @param req
   * @param res
   * @param next
   * @returns id, email, follower, folloing, blockedUsers, info
   *
   *
   */
  public findMyInfos = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("", {
        method: "get",
        url: "api/user/:email",
        layer: "Handlers",
        className: "UserHandler",
        functionName: "findMyInfos",
      });
      const myId: string = res.locals.userInfo.userId;

      const result = await this.userService.findMyInfos(myId);
      return res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  // 특정유저의 정보가져오기
  public findUserByEmail = async (
    req: Request<{ email: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("", {
        method: "get",
        url: "api/user/:email",
        layer: "Handlers",
        className: "UserHandler",
        functionName: "findUserByEmail",
      });
      const email: string = req.params.email;

      const result = await this.userService.findUserByEmail(email);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  // 자신의 정보가져오기
  public findUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("", {
        method: "get",
        url: "api/user/myinfo",
        layer: "Handlers",
        className: "UserHandler",
        functionName: "findUserById",
      });
      const userId: string = res.locals.userInfo.userId;

      const result = await this.userService.findUserById(userId);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   *
   * @param req
   * @param res
   * @param next
   * @return 자신의 팔로잉 팔로워리스트 가져오기
   */
  // 회원정보 수정하기
  public modifyUserInfo = async (
    req: Request<{ id: string }, {}, ModifyUserDto, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("", {
        method: "put",
        url: "api/user/:id",
        layer: "Handlers",
        className: "UserHandler",
        functionName: "modifyUserInfo",
      });
      const userInfo: ModifyUserDto = {
        userId: res.locals.userInfo.userId,
        username: req.body.username,
        aboutMe: req.body.aboutMe,
        age: req.body.age,
      };
      // aboutMe형식
      if (aboutMeExp(userInfo.aboutMe))
        throw new Error("100자이내로 써주세요.");

      // age형식
      if (ageExp(userInfo.age)) throw new Error("나이형식에 맞지않습니다.");

      // username형식
      if (username(userInfo.username))
        throw new Error("유저이름형식에 맞지않습니다. ");

      await this.userService.modifyUserInfo(userInfo);
      return res.status(200).send("유저정보가 변경되었습니다. ");
    } catch (error) {
      next(error);
    }
  };

  // 회원탈퇴
  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("", {
        method: "delete",
        url: "api/user/:id",
        layer: "Handlers",
        className: "UserHandler",
        functionName: "deleteUser",
      });
      const id = res.locals.userInfo.userId;
      await this.userService.deleteUser(id);
      return res.status(200).send({ message: "회원탈퇴가 완료되었습니다." });
    } catch (error) {
      next(error);
    }
  };

  public getBlockedUsers = async (
    req: Request<{}, {}, GetBlockedUsersDto, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("", {
        method: "delete",
        url: "api/user/get-blockedusers-list",
        layer: "Handlers",
        className: "UserHandler",
        functionName: "getBlockedUsers",
      });

      const params: GetBlockedUsersDto = {
        blockedUserIds: req.body.blockedUserIds,
      };
      const result = await this.userService.getBlockedUsers(params);
      return res.status(200).json({ datas: result });
    } catch (error) {
      next(error);
    }
  };
}

export default UserHandler;
