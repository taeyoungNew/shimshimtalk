"use strict";

import { Model, DataTypes, Association } from "sequelize";

import connection from "../connection";
import Users from "./users";

interface UserInfoAttributes {
  userId: number;
  username: string;
  nickname: string;
  aboutMe: string;
  age: number;
}

class UserInfos extends Model implements UserInfoAttributes {
  public userId!: number;
  public username!: string;
  public nickname!: string;
  public aboutMe!: string;
  public age!: number;

  // public static associations: {
  //   UserInfos: Association<UserInfos, Users>;
  // };

  static associate() {
    UserInfos.belongsTo(Users, {
      foreignKey: "userId",
      targetKey: "id",
    });
  }
  // public static associate() {
  //   // // user - userInfo
}

UserInfos.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: "id",
      },
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    nickname: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    aboutMe: {
      type: DataTypes.STRING,
    },
    age: DataTypes.INTEGER({
      length: 100,
    }),
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  { sequelize: connection, modelName: "UserInfo" }
);

// user - userinfo

export default UserInfos;