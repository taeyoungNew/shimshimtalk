import { Request, Response } from "express";
import { LoginDto } from "../dtos/auth/loginDto";
import { accesssToken } from "../middlewares/common/accToken";
import { refreshToken } from "../middlewares/common/refToken";
import UserService from "../service/usersService";
import AuthService from "../service/authService";
import bcrypt from "bcrypt";

class AuthHandler {
  userService = new UserService();
  authService = new AuthService();
  public loginUser = async (req: Request<{}, {}, LoginDto>, res: Response) => {
    const { email, password } = req.body;
    console.log(email, password);

    try {
      // 로그인정보로 회원유무확인
      const getUserInfo = await this.userService.findUserByEmail(email);
      // 패스워드확인
      this.validPassword(password, getUserInfo.password);

      // acc & ref token생성
      const accToken = accesssToken(getUserInfo.id, getUserInfo.email);
      // const refToken = await refreshToken(email);
      // refToken 생성
      const refToken = refreshToken(getUserInfo.id, getUserInfo.email);
      // refToken 저장
      await this.authService.saveRefToken(refToken, getUserInfo.id);
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

  public validPassword = (password: string, exPassword: string) => {
    console.log(password, exPassword);

    const result = bcrypt.compareSync(password, exPassword);

    if (!result) throw new Error("패스워드가 일치하지않습니다.");
  };
}

export default AuthHandler;
