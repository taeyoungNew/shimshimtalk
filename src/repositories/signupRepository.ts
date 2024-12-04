import { SignupDto } from "../dtos/user/signupDto";
import Users from "../database/models/users";
import UserInfos from "../database/models/userinfos";
import { Sequelize } from "sequelize-typescript";

class UserRepository {
  // 회원가입
  public createUser = async (signupInfo: SignupDto) => {
    const user = {
      email: signupInfo.email,
      password: signupInfo.password,
    };
    try {
      // 일단 존재하는지 아닌지를 확인
      const isCheckUser = await this.findByEmail(user.email);
      if (isCheckUser) throw Error("이미 존재하는 유저입니다.");
      await Users.create(user);
      const findId = await this.findByEmail(user.email);
      await UserInfos.create({
        userId: findId!.id,
        username: signupInfo.username,
        aboutMe: signupInfo.aboutMe,
        nickname: signupInfo.nickname,
        age: signupInfo.age,
      });

      // await transaction.commit();
    } catch (error) {
      // if (transaction) transaction.rollback();
      throw error;
    }
  };

  // email로 회원정보가져오기
  public findByEmail = async (email: string) => {
    try {
      const result = await Users.findOne({
        where: {
          email: email,
        },
      });
      if (!result) throw Error("존재하지않는 아이디입니다.");
      return result;
    } catch (error) {
      throw error;
    }
  };

  // id로 회원정보가져오기
  public userFindById = async (id: string) => {
    try {
      const result = await Users.findByPk(id, {
        attributes: ["id", "email"],
        include: [
          { model: UserInfos, attributes: ["username", "age", "aboutMe"] },
        ],
      });
      if (!result) throw Error("존재하지않는 아이디입니다.");
      return result;
    } catch (error) {
      throw error;
    }
  };

  // 모든 회원정보가져오기
  public findAllUser = async () => {
    try {
      const result = await Users.findAll({
        attributes: ["email"],
        include: {
          model: UserInfos,
          attributes: ["username", "aboutMe", "nickname"],
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  };
}

export default UserRepository;
