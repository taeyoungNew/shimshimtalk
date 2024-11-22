import { UUIDTypes } from "uuid";
import { SignupDto } from "../dtos/signupDto";
import User from "../database/models/users";

class UserRepository {
  public createUser = async (signupInfo: SignupDto) => {
    try {
      const userInfo = {
        email: signupInfo.email,
        password: signupInfo.password,
      };
      console.log(userInfo);
      await User.findAll();
    } catch (error) {
      throw error;
    }
  };
  public findById = (id: UUIDTypes) => {};
}

export default UserRepository;
