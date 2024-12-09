import Users from "../database/models/users";
import UserInfos from "../database/models/userinfos";
import { ModifyUserDto } from "../dtos/user/modifyUserDto";
import {
  SignupUserEntity,
  SignupUserInfosEntity,
} from "../entity/users/userEntity";
import sequelizeConnection from "../database/connection";

class UserRepository {
  // Users 회원가입
  public createUser = async (signupInfo: SignupUserEntity) => {
    await Users.create({
      email: signupInfo.email,
      password: signupInfo.password,
    });
  };

  // UserInfos 회원가입
  public createUserInfo = async (signupInfo: SignupUserInfosEntity) => {
    await UserInfos.create({
      userId: signupInfo!.userId,
      username: signupInfo.username,
      aboutMe: signupInfo.aboutMe,
      nickname: signupInfo.nickname,
      age: signupInfo.age,
    });
  };

  // email로 회원정보가져오기
  public findByEmail = async (email: string) => {
    const result = await Users.findOne({
      attributes: ["id", "email"],
      where: {
        email,
      },
    });
    return result;
  };

  // id로 회원정보가져오기
  public userFindById = async (id: string) => {
    const result = await Users.findByPk(id, {
      attributes: ["id", "email"],
      include: [
        { model: UserInfos, attributes: ["username", "age", "aboutMe"] },
      ],
    });

    return result;
  };

  public checkNickname = async (nickname: string) => {
    const result = await UserInfos.findOne({
      where: {
        nickname,
      },
    });

    return result;
  };

  // 모든 회원정보가져오기
  public findAllUser = async () => {
    const result = await Users.findAll({
      attributes: ["email"],
      include: {
        model: UserInfos,
        attributes: ["username", "aboutMe", "nickname"],
      },
    });
    return result;
  };

  // nickname수정
  public modifyNickname = async (userId: string, newNickname: string) => {
    await UserInfos.update(
      { nickname: newNickname },
      {
        where: {
          userId: userId,
        },
      }
    );
  };
  // aboutMe수정
  public modifyAboutMe = async (userId: string, aboutMe: string) => {
    await UserInfos.update(
      { aboutMe: aboutMe },
      {
        where: {
          userId: userId,
        },
      }
    );
  };
  // age수정
  public modifyAge = async (userId: string, age: string) => {
    await UserInfos.update({ age }, { where: { userId } });
  };

  // password수정
  public modifyPasssword = async (userId: string, password: string) => {
    await Users.update(
      { password: password },
      {
        where: {
          userId: userId,
        },
      }
    );
  };

  // 회원정보수정
  public modifyUserInfos = async (userInfo: ModifyUserDto) => {
    await Users.update(userInfo, { where: { userId: userInfo.userId } });
  };
}

export default UserRepository;
