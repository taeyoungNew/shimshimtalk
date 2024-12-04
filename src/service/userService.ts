import { UUIDTypes } from "uuid";
import { SignupDto } from "../dtos/user/signupDto";
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

  // public findById = async (id: number) => {
  //   try {
  //     const user = await this.userRepository;
  //   } catch {}
  // };

  public findAllUser = async () => {
    try {
      const result = await this.userRepository.findAllUser();
      return result;
    } catch (error) {
      throw error;
    }
  };

  public findUser = async (id: string) => {
    try {
      const result = await this.userRepository.userFindById(id);
      return result;
    } catch (error) {
      throw error;
    }
  };
}

export default UserService;

// export function userSignupService(userInfo: SignupDto) {}
