import { SignupDto } from "../dtos/users/signupDto";
import { ModifyUserDto } from "../dtos/users/modifyUserDto";
import UserRepository from "../repositories/usersRepository";
import bcrypt from "bcrypt";
class UserService {
  userRepository = new UserRepository();

  // 회원가입
  public createUser = async (userInfo: SignupDto) => {
    try {
      // 중복된 이메일을 쓰는지 확인
      await this.checkUserByEmail(userInfo.email);
      // 중복된 닉네임인지 확인
      await this.checkNickname(userInfo.nickname);
      // password암호화하기
      const hashpassword = bcrypt.hashSync(
        userInfo.password,
        Number(process.env.SALT_ROUND)
      );
      // payment
      const signupUser = {
        email: userInfo.email,
        password: hashpassword,
      };

      // User회원가입
      await this.userRepository.createUser(signupUser);
      // email로 회원가입하는 회원의 id값을 가져옴
      const result = await this.findUserByEmail(userInfo.email);
      const signupUserInfo = {
        userId: result.id,
        username: userInfo.username,
        aboutMe: userInfo.aboutMe,
        nickname: userInfo.nickname,
        age: userInfo.age,
      };
      // userInfo저장
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

  // 특정회원정보찾기
  public getUserInfo = async (email: string) => {
    try {
      await this.findUserByEmail(email);
      return await this.userRepository.findByEmail(email);
    } catch (error) {
      throw error;
    }
  };

  // id로 회원정보 찾기
  public findUser = async (id: string) => {
    try {
      await this.findUserById(id);
      const result = await this.userRepository.findById(id);
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

  //

  // 특정회원의 정보(id)
  public findUserById = async (userId: string) => {
    try {
      const result = this.userRepository.findById(userId);
      if (!result) {
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

  // private getUserPass = async (id: string) => {
  //   try {
  //     return await UserRepository.getUserPass(id);
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // 회원탈퇴
  public deleteUser = async (id: string) => {
    try {
      await this.findUserById(id);
      await this.userRepository.deleteAccount(id);
    } catch (error) {
      throw error;
    }
  };
}

export default UserService;

// export function userSignupService(userInfo: SignupDto) {}
