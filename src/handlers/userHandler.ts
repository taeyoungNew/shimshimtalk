import { NextFunction, Request, RequestHandler, Response } from "express";
import { SignupDto } from "../dtos/signupDto";
import { CreateUserQueryParams } from "../types/query-params";
import { User } from "../types/reponse";
import UserService from "../service/userService";
import {
  emailExp,
  passwordExp,
  nicknameExp,
} from "../common/validators/signupExp";

// 会員登録

class UserHandler {
  userService = new UserService();
  public createUser: RequestHandler = async (
    req: Request<{}, {}, SignupDto, {}>,
    res,
    next
  ) => {
    try {
      const { email, password, aboutMe, age, nickname, username } = req.body;
      if (!emailExp(email)) throw new Error("이메일형식이 맞지 않습니다. ");

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
}

export default UserHandler;
// export function userSignupHandler(
//   req: Request<{}, {}, SignupDto, CreateUserQueryParams>,
//   res: Response<User>, // res의 타입을 지정
//   next: NextFunction
// ) {
//   try {
//     userSignupService(req.body);
//     res
//       .status(200)
//       .json({ id: 1, email: "dndbxhd10@naver.com", username: "민태영" });
//   } catch (error) {
//     next(error);
//   }

//   return;
// }
