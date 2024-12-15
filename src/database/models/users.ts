"use strict";

import { Model, DataTypes, Association } from "sequelize";
import connection from "../connection";
import UserInfos from "./userinfos";
import Posts from "./posts";

interface UsersAttributes {
  id: string;
  email: string;
  password: string;
  refToken: string;
  refTokenExp: Date;
}

class Users extends Model implements UsersAttributes {
  public id!: string;
  public email!: string;
  public password!: string;
  public refToken!: string;
  public refTokenExp!: Date;

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
      // autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },

    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    refToken: {
      type: DataTypes.STRING,
    },
    refTokenExp: {
      type: DataTypes.DATE,
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
