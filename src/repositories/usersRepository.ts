import Users from "../database/models/users";
import UserInfos from "../database/models/userinfos";
import { ModifyUserDto } from "../dtos/users/modifyUserDto";
import {
  SignupUserEntity,
  SignupUserInfosEntity,
} from "../entity/usersEntity/userEntity";
import { ModifyPostEntity } from "../entity/postsEntity/postEntity";

class UserRepository {
  // refToken취득
  public getRefToken = async (userId: string) => {
    const result = await Users.findByPk(userId, {
      attributes: ["refToken"],
      raw: true,
    });
    return result;
  };

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
      attributes: ["id", "email", "password"],
      where: {
        email,
      },
    });
    return result;
  };

  // id로 회원정보가져오기
  public findById = async (id: string) => {
    console.log("id = ", id);

    const result = await Users.findOne({
      attributes: ["id", "email"],
      where: { id },
    });
    // const result = await Users.findOne({
    //   attributes: ["id", "email"],
    //   where: { id: id },
    //   include: [
    //     { model: UserInfos, attributes: ["username", "age", "aboutMe"] },
    //   ],
    // });

    return result;
  };

  // 닉네임 취득
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
    await UserInfos.update(userInfo, { where: { userId: userInfo.userId } });
  };

  // 회원탈퇴
  public deleteAccount = async (id: string) => {
    await Users.destroy({ where: { id } });
  };
}

export default UserRepository;
