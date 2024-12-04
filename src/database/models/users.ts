"use strict";

import { Model, DataTypes, Association } from "sequelize";
import connection from "../connection";
import UserInfos from "./userinfos";
import Posts from "./posts";

interface UsersAttributes {
  id: number;
  email: string;
  password: string;
}

class Users extends Model implements UsersAttributes {
  public id!: number;
  public email!: string;
  public password!: string;

  // public static associations: { UserInfos: Association<Users, UserInfos> };

  static associate() {}
  // public static associate() {
  //   // // user - userInfo
  //   this.hasOne(UserInfos, {
  //     foreignKey: "userId",
  //     sourceKey: "id",
  //   });

  //   // following follower
  //   Users.belongsToMany(Users, {
  //     through: "Follows",
  //     as: "followerId",
  //     onDelete: "cascade",
  //   });
  //   Users.belongsToMany(Users, {
  //     through: "Follows",
  //     as: "followingId",
  //     onDelete: "cascade",
  //   });

  //   // user - postLike
  //   Users.belongsToMany(Posts, {
  //     through: "PostLikes",
  //     as: "userId",
  //     onDelete: "cascade",
  //   });
  // }
}

Users.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER,
    },

    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: connection,
    modelName: "User",
  }
);

// // user - userInfo

// Users.hasOne(UserInfos, {
//   foreignKey: "userId",
//   sourceKey: "id",
// });
Users.hasOne(UserInfos, {
  foreignKey: "userId",
  sourceKey: "id",
});

Users.hasMany(Posts, {
  foreignKey: "userId",
  sourceKey: "id",
});

export default Users;
