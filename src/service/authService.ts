import AuthRepository from "../repositories/authRepository";
class AuthService {
  authRepository = new AuthRepository();
  // refToken저장
  public saveRefToken = async (refToken: string, userId: string) => {
    try {
      await this.authRepository.saveRefToken(refToken, userId);
    } catch (error) {
      throw error;
    }
  };

  //
  public logoutUser = async (userId: string) => {
    try {
      await this.authRepository.logoutUser(userId);
    } catch (error) {
      throw error;
    }
  };
}

export default AuthService;
