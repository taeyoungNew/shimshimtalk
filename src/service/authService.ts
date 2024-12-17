import AuthRepository from "../repositories/authRepository";
class AuthService {
  authRepository = new AuthRepository();
  // refToken저장
  public saveRefToken = async (refToken: string, userId: string) => {
    await this.authRepository.saveRefToken(refToken, userId);
  };
}

export default AuthService;
