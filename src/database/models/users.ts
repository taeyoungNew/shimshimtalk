"use strict";

import { Model, DataTypes, Association } from "sequelize";
import connection from "../connection";
import UserInfos from "./userinfos";
import Posts from "./posts";
import Comments from "./comments";
import PostLikes from "./postlikes";
import CommentLikes from "./commentlike";
import Follows from "./follows";

interface UsersAttributes {
  id: string;
  email: string;
  password: string;
  refToken: string;
  refTokenExp: Date;
}

class Users extends Model implements UsersAttributes {
  [x: string]: any;
  public id!: string;
  public email!: string;
  public password!: string;
  public refToken!: string;
  public refTokenExp!: Date;

  // public static associations: { UserInfos: Association<Users, UserInfos> };

  static associate() {
    // following follower
    Users.belongsToMany(Users, {
      as: "follower",
      through: "Follows",
      onUpdate: "cascade",
      onDelete: "cascade",
    });

    Users.belongsToMany(Users, {
      as: "following",
      through: "Follows",
      onUpdate: "cascade",
      onDelete: "cascade",
    });

    Users.belongsToMany(PostLikes, {
      through: "PostLikes",
      as: "userId",
      onUpdate: "cascade",
      onDelete: "cascade",
    });

    Users.belongsToMany(CommentLikes, {
      through: "CommentLikes",
      as: "commentId",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  }
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
  hooks: true,
  onUpdate: "cascade",
  onDelete: "cascade",
});

// 게시물
Users.hasMany(Posts, {
  foreignKey: "userId",
  sourceKey: "id",
  hooks: true,
  onUpdate: "cascade",
  onDelete: "cascade",
});

// 댓글
Users.hasMany(Comments, {
  foreignKey: "userId",
  sourceKey: "id",
  hooks: true,
  onUpdate: "cascade",
  onDelete: "cascade",
});

//  follow
Users.hasMany(Follows, {
  foreignKey: "followingId",
  sourceKey: "id",
  hooks: true,
  onUpdate: "cascade",
  onDelete: "cascade",
});

Users.hasMany(Follows, {
  foreignKey: "followerId",
  sourceKey: "id",
  hooks: true,
  onUpdate: "cascade",
  onDelete: "cascade",
});

export default Users;
