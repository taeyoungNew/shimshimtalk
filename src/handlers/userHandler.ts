import { Response, Request, RequestHandler } from "express";
import { SignupDto } from "../dtos/user/signupDto";
import UserService from "../service/userService";
import {
  emailExp,
  passwordExp,
  nicknameExp,
} from "../common/validators/signupExp";

// 会s員登録

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

  public findAllUser: RequestHandler = async (req, res, next) => {
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
  public modifyUserInfo: RequestHandler = (
    req: Request<{}, {}, SignupDto, {}>,
    res,
    next
  ) => {};
  public deleteUser: RequestHandler = (
    req: Request<{}, {}, SignupDto, {}>,
    res,
    next
  ) => {};
}

export default UserHandler;
