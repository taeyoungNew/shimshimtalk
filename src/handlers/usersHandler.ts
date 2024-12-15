import { Response, Request, RequestHandler } from "express";
import { SignupDto } from "../dtos/users/signupDto";
import { ModifyUserDto } from "../dtos/users/modifyUserDto";
import UserService from "../service/usersService";
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
  public createUser: RequestHandler = async (
    req: Request<{}, {}, SignupDto, {}>,
    res: Response,
    next
  ) => {
    try {
      const { email, password, aboutMe, age, nickname, username } = req.body;
      if (!emailExp(email)) throw Error("이메일형식이 맞지 않습니다. ");

      if (!passwordExp(password))
        throw new Error("패스워드형식이 맞지 않습니다.");

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
      throw e;
    }
  };

  // 모든 회원정보 가져오기
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

  // 유저의 정보가져오기
  public findUser: RequestHandler = async (
    req: Request,
    res: Response,
    next
  ) => {
    try {
      const userId: string = req.params.id;
      const result = await this.userService.findUser(userId);
      return res.status(200).json(result);
    } catch (error) {
      throw error;
    }
  };

  // 회원정보 수정하기
  public modifyUserInfo: RequestHandler = async (
    req: Request<{}, {}, ModifyUserDto, {}>,
    res: Response,
    next
  ) => {
    try {
      const userInfo: ModifyUserDto = {
        userId: req.body.userId,
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
  public deleteUser: RequestHandler = (
    req: Request<{}, {}, SignupDto, {}>,
    res,
    next
  ) => {};
}

export default UserHandler;