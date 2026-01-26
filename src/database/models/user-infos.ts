"use strict";

import { Model, DataTypes, Association, Sequelize } from "sequelize";

import connection from "../connection";
import Users from "./users";

interface UserInfoAttributes {
  userId: string;
  profileUrl: string;
  username: string;
  nickname: string;
  aboutMe: string;
  age: number;
}

class UserInfos extends Model implements UserInfoAttributes {
  userId!: string;
  profileUrl!: string;
  username!: string;
  nickname!: string;
  aboutMe!: string;
  age!: number;

  static initModel(sequelize: Sequelize) {
    return UserInfos.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },

        userId: {
          allowNull: false,
          type: DataTypes.UUID,
          references: {
            model: Users,
            key: "id",
          },
        },
        profileUrl: {
          allowNull: true,
          type: DataTypes.STRING,
          defaultValue: "",
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
      { sequelize: sequelize, modelName: "UserInfos" },
    );
  }

  static associate(db: any) {
    UserInfos.belongsTo(db.Users, {
      foreignKey: "userId",
      targetKey: "id",
      as: "user",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  }
}

export default UserInfos;
