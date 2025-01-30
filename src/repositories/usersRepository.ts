import Users from "../database/models/users";
import UserInfos from "../database/models/userinfos";
import { ModifyUserDto } from "../dtos/users/modifyUserDto";
import { SignupUserEntity, SignupUserInfosEntity } from "../entity/userEntity";
import logger from "../config/logger";
import sequelize from "sequelize";

class UserRepository {
  // refToken취득
  public getRefToken = async (userId: string) => {
    logger.info("", {
      layer: "Repository",
      className: "UserRepository",
      functionName: "getRefToken",
    });
    const result = await Users.findByPk(userId, {
      attributes: ["refToken"],
      raw: true,
    });
    return result;
  };

  // Users 회원가입
  public createUser = async (signupInfo: SignupUserEntity) => {
    logger.info("", {
      layer: "Repository",
      className: "UserRepository",
      functionName: "createUser",
    });
    await Users.create({
      email: signupInfo.email,
      password: signupInfo.password,
    });
  };

  // UserInfos 회원가입
  public createUserInfo = async (signupInfo: SignupUserInfosEntity) => {
    logger.info("", {
      layer: "Repository",
      className: "UserRepository",
      functionName: "createUserInfo",
    });
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
    logger.info("", {
      layer: "Repository",
      className: "UserRepository",
      functionName: "findByEmail",
    });
    const result = await Users.findOne({
      attributes: ["id", "email", "password"],
      include: [
        {
          model: UserInfos,
          attributes: ["username", "nickname", "aboutMe", "age"],
        },
      ],
      // group: ["Users.id"],
      where: {
        email,
      },
    });
    return result;
  };

  // id로 회원정보가져오기
  public findById = async (id: string) => {
    logger.info("", {
      layer: "Repository",
      className: "UserRepository",
      functionName: "findById",
    });
    // 에러가 난이유는 서브쿼라의 from절에서 테이블을 찾지못했기때문
    // migrate의 모델명으로 해야한다
    const result = await Users.findOne({
      attributes: {
        exclude: [
          "refToken",
          "password",
          "refTokenExp",
          "createdAt",
          "updatedAt",
        ],
        include: [
          [
            sequelize.literal(`(
              SELECT COUNT(CASE WHEN followingId = '${id}' THEN 1 END)
                FROM Follows
            )`),
            "followerCtn",
          ],
          [
            sequelize.literal(`(
              SELECT COUNT(CASE WHEN followerId = '${id}' THEN 1 END)
                FROM Follows
            )`),
            "followingCtn",
          ],
        ],
      },
      include: {
        model: UserInfos,
        attributes: ["nickname", "aboutMe", "age"],
      },
      subQuery: true,
      where: { id },
    });

    // sequelize.literal(`(
    //   SELECT COUNT(CASE WHEN Follows.followerId = ${id} THEN 1 END)
    //     FROM Follows
    //   )`),
    //   "followerCtn",

    return result;
  };

  // 닉네임 취득
  public checkNickname = async (nickname: string) => {
    logger.info("", {
      layer: "Repository",
      className: "UserRepository",
      functionName: "checkNickname",
    });
    const result = await UserInfos.findOne({
      where: {
        nickname,
      },
    });

    return result;
  };

  // 모든 회원정보가져오기
  public findAllUser = async () => {
    logger.info("", {
      layer: "Repository",
      className: "UserRepository",
      functionName: "findAllUser",
    });
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
    logger.info("", {
      layer: "Repository",
      className: "UserRepository",
      functionName: "modifyNickname",
    });
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
    logger.info("", {
      layer: "Repository",
      className: "UserRepository",
      functionName: "modifyAboutMe",
    });
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
    logger.info("", {
      layer: "Repository",
      className: "UserRepository",
      functionName: "modifyAge",
    });
    await UserInfos.update({ age }, { where: { userId } });
  };

  // password수정
  public modifyPasssword = async (userId: string, password: string) => {
    logger.info("", {
      layer: "Repository",
      className: "UserRepository",
      functionName: "modifyPasssword",
    });
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
    logger.info("", {
      layer: "Repository",
      className: "UserRepository",
      functionName: "modifyUserInfos",
    });
    await UserInfos.update(userInfo, { where: { userId: userInfo.userId } });
  };

  // 회원탈퇴
  public deleteAccount = async (id: string) => {
    logger.info("", {
      layer: "Repository",
      className: "UserRepository",
      functionName: "deleteAccount",
    });
    await Users.destroy({ where: { id } });
  };
}

export default UserRepository;
