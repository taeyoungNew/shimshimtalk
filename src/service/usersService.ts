import { SignupDto } from "../dtos/users/signupDto";
import { ModifyUserDto } from "../dtos/users/modifyUserDto";
import UserRepository from "../repositories/usersRepository";
import sequelizeConnection from "../database/connection";
class UserService {
  userRepository = new UserRepository();

  // 회원가입
  public createUser = async (userInfo: SignupDto) => {
    try {
      const signupUser = {
        email: userInfo.email,
        password: userInfo.password,
      };

      // 중복된 이메일을 쓰는지 확인
      await this.checkUserByEmail(signupUser.email);
      // 중복된 닉네임인지 확인
      await this.checkNickname(userInfo.nickname);
      // User회원가입
      await this.userRepository.createUser(signupUser);

      const result = await this.findUserByEmail(userInfo.email);
      const signupUserInfo = {
        userId: result.id,
        username: userInfo.username,
        aboutMe: userInfo.aboutMe,
        nickname: userInfo.nickname,
        age: userInfo.age,
      };
      await this.userRepository.createUserInfo(signupUserInfo);
    } catch (e) {
      throw e;
    }
  };

  // 모든회원정보
  public findAllUser = async () => {
    try {
      const result = await this.userRepository.findAllUser();
      return result;
    } catch (error) {
      throw error;
    }
  };

  // 특정회원정보
  public findUser = async (id: string) => {
    try {
      await this.findUserById(id);
      const result = await this.userRepository.userFindById(id);
      return result;
    } catch (error) {
      throw error;
    }
  };

  // 특정회원정보변경
  public modifyUserInfo = async (userInfo: ModifyUserDto) => {
    try {
      await this.findUserById(userInfo.userId);
      await this.userRepository.modifyUserInfos(userInfo);
    } catch (error) {
      throw error;
    }
  };

  // 회원탈퇴

  // public modifyNickname = (userId: string, nickanem: string) => {
  //   try {
  //     const checkUser = this.userRepository.userFindById(userId);
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // public modifyAboutMe = (userId: string, aboutMe: string) => {
  //   try {
  //     const checkUser = this.userRepository.userFindById(userId);
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // public modifyPasssword = (userId: string, password: string) => {
  //   try {
  //     const checkUser = this.findUserById(userId);
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // 특정회원의 정보(id)
  public findUserById = async (userId: string) => {
    try {
      const result = this.userRepository.userFindById(userId);
      if (result) {
        throw new Error("존재하지않는 회원입니다.");
      }
      return result;
    } catch (error) {
      throw error;
    }
  };

  // 특정회원의 중복유무
  public checkUserByEmail = async (email: string) => {
    try {
      const result = await this.userRepository.findByEmail(email);
      if (result) {
        throw new Error("이미 존재하는 회원입니다.");
      }
    } catch (error) {
      throw error;
    }
  };
  // nickname중복체크
  public checkNickname = async (nickname: string) => {
    try {
      const result = await this.userRepository.checkNickname(nickname);
      if (result) {
        throw new Error("이미 사용중인 닉네임입니다..");
      }
    } catch (error) {
      throw error;
    }
  };

  // 특정회원의 정보(email)
  public findUserByEmail = async (email: string) => {
    try {
      const result = await this.userRepository.findByEmail(email);
      if (!result) {
        throw new Error("존재하지않는 회원입니다.");
      }
      return result;
    } catch (error) {
      throw error;
    }
  };
}

export default UserService;

// export function userSignupService(userInfo: SignupDto) {}
