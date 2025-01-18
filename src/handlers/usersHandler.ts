import { Response, Request, RequestHandler, NextFunction } from "express";
import { SignupDto } from "../dtos/users/signupDto";
import { ModifyUserDto } from "../dtos/users/modifyUserDto";
import UserService from "../service/usersService";
import FollowService from "../service/followService";
import {
  emailExp,
  passwordExp,
  nicknameExp,
  aboutMeExp,
  ageExp,
  username,
} from "../common/validators/userExp";

// 会員登録
class UserHandler {
  userService = new UserService();
  followService = new FollowService();
  public createUser: RequestHandler = async (
    req: Request<{}, {}, SignupDto, {}>,
    res: Response,
    next
  ) => {
    try {
      const { email, password, aboutMe, age, nickname, username } = req.body;
      if (!emailExp(email)) throw Error("이메일형식이 맞지 않습니다. ");

      if (!passwordExp(password)) next("패스워드형식이 맞지 않습니다.");

      if (!nicknameExp(nickname)) throw new Error("닉네임형식에 맞지않습니다.");
      const signupInfo: SignupDto = {
        email,
        password,
        aboutMe,
        age,
        nickname,
        username,
      };
      await this.userService.createUser(signupInfo);
      return res.status(200).send("회원가입완료");
    } catch (e) {
      next(e);
    }
  };

  // 모든 회원정보 가져오기
  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns
   * 프로필, 닉네임, id값만 가져오기
   */
  public findAllUser: RequestHandler = async (
    req: Request,
    res: Response,
    next
  ) => {
    try {
      const result = await this.userService.findAllUser();
      return res.status(200).json(result);
    } catch (error) {
      throw error;
    }
  };

  // email로 유저의 정보가져오기
  public findUserByEmail = async (
    req: Request<{ email: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const email: string = req.params.email;

      const result = await this.userService.findUserByEmail(email);
      return res.status(200).json(result);
    } catch (error) {
      throw error;
    }
  };

  // id로 유저의 정보가져오기

  // 유저의 정보가져오기
  public findUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId: string = res.locals.userInfo.userId;

      const result = await this.userService.findUserById(userId);
      return res.status(200).json(result);
    } catch (error) {
      throw error;
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
      console.log("수정하기");

      const userInfo: ModifyUserDto = {
        userId: req.params.id,
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
      throw error;
    }
  };

  // 회원탈퇴
  public deleteUser = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      await this.userService.deleteUser(id);
      return res.status(200).send({ message: "회원탈퇴가 완료되었습니다." });
    } catch (error) {
      throw error;
    }
  };
}

export default UserHandler;
