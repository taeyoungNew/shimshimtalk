import { Request, Response } from "express";
import { LoginDto } from "../dtos/auth/loginDto";
import { accessToken } from "../middlewares/common/accToken";
import { refreshToken } from "../middlewares/common/refToken";
import userCache from "../common/cache/userIdCache";
import UserService from "../service/usersService";
import AuthService from "../service/authService";
import bcrypt from "bcrypt";

class AuthHandler {
  userService = new UserService();
  authService = new AuthService();
  public loginUser = async (req: Request<{}, {}, LoginDto>, res: Response) => {
    const { email, password } = req.body;

    try {
      // 로그인정보로 회원유무확인
      const getUserInfo = await this.userService.findUserByEmail(email);
      // 패스워드확인
      this.validPassword(password, getUserInfo.password);

      // acc & ref token생성
      const accToken: string = accessToken(getUserInfo.id, getUserInfo.email);
      // const refToken = await refreshToken(email);
      // refToken 생성
      const refToken: string = refreshToken(getUserInfo.id, getUserInfo.email);
      // refToken 저장
      await this.authService.saveRefToken(refToken, getUserInfo.id);
      // cache에 유저id저장
      await userCache.set("userId", JSON.stringify(getUserInfo.id));

      // accToken쿠기에 담기
      res.cookie("authorization", `Bearer ${accToken}`);
      return res.status(200).json({
        message: "로그인되었습니다. ",
        data: {
          id: getUserInfo.id,
          email: getUserInfo.email,
        },
      });
    } catch (error) {
      throw error;
    }
  };

  public logoutUser = async (req: Request, res: Response) => {
    try {
      await userCache.del("userId");
      res.clearCookie("authorization");
      return res.status(200).json({
        message: "로그아웃되었습니다. ",
      });
    } catch (error) {
      throw error;
    }
  };

  public validPassword = (password: string, exPassword: string) => {
    const result = bcrypt.compareSync(password, exPassword);

    if (!result) throw new Error("패스워드가 일치하지않습니다.");
  };
}

export default AuthHandler;
