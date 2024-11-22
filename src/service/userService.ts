import { UUIDTypes } from "uuid";
import { SignupDto } from "../dtos/signupDto";
import UserRepository from "../repositories/signupRepository";

class UserService {
  userRepository = new UserRepository();
  public createUser = async (signupInfo: SignupDto) => {
    try {
      await this.userRepository.createUser(signupInfo);
    } catch (e) {
      throw e;
    }
  };

  public findById = async (id: UUIDTypes) => {
    try {
      const user = await this.userRepository;
    } catch {}
  };
}

export default UserService;

// export function userSignupService(userInfo: SignupDto) {}
