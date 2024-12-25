"use strict";

import { Model, DataTypes, Association } from "sequelize";
import connection from "../connection";
import UserInfos from "./userinfos";
import Posts from "./posts";
import Comments from "./comments";
import PostLikes from "./postlikes";
import CommentLikes from "./commentlike";

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

  static associate() {
    // following follower
    Users.belongsToMany(Users, {
      through: "Follows",
      as: "followerId",
      onDelete: "cascade",
    });
    Users.belongsToMany(Users, {
      through: "Follows",
      as: "followingId",
      onDelete: "cascade",
    });

    Users.belongsToMany(PostLikes, {
      through: "PostLikes",
      as: "userId",
      onDelete: "cascade",
    });

    Users.belongsToMany(CommentLikes, {
      through: "CommentLikes",
      as: "commentId",
      onDelete: "cascade",
    });
  }
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

// 유저정보
Users.hasOne(UserInfos, {
  foreignKey: "userId",
  sourceKey: "id",
});

// 게시물
Users.hasMany(Posts, {
  foreignKey: "userId",
  sourceKey: "id",
});

// 댓글
Users.hasMany(Comments, {
  foreignKey: "userId",
  sourceKey: "id",
});

export default Users;
