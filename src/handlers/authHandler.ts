import { Request, Response } from "express";
import { LoginDto } from "../dtos/auth/loginDto";
import { accesssToken } from "../middlewares/common/accToken";
import { refreshToken } from "../middlewares/common/refToken";
import UserService from "../service/usersService";
import bcrypt from "bcrypt";

class LoginHandler {
  userService = new UserService();
  public loginUser = async (req: Request<{}, {}, LoginDto>, res: Response) => {
    const { email, password } = req.body;
    try {
      // 회원정보가져오기
      const getUserInfo = await this.userService.findUserByEmail(email);
      // 패스워드확인
      this.validPassword(password, getUserInfo.password);

      // acc & ref token생성
      const accToken = accesssToken(getUserInfo.id, getUserInfo.email);
      // const refToken = await refreshToken(email);
    } catch (error) {
      throw error;
    }
  };

  public validPassword = (password: string, exPassword: string) => {
    const result = bcrypt.compareSync(password, exPassword);
    if (!result) throw new Error("패스워드가 일치하지않습니다.");
  };
}

export default LoginHandler;
