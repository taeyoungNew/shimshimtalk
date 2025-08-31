"use strict";

import { Model, DataTypes, Association } from "sequelize";
import connection from "../connection";
import Users from "./users";
import Comments from "./comments";
import PostLikes from "./postlikes";

interface PostsAttributes {
  userId: string;
  title: string;
  content: string;
}

class Posts extends Model implements PostsAttributes {
  [x: string]: any;
  id: number;
  public userId!: string;
  public title!: string;
  public content!: string;

  static associate() {
    // user - post
    Posts.belongsTo(Users, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      targetKey: "id",
      foreignKeyConstraint: true,
      onUpdate: "cascade",
      onDelete: "cascade",
    });

    // 좋아요
    Posts.belongsToMany(PostLikes, {
      through: "PostLikes",
      as: "postId",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  }
}

Posts.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    // title: { type: DataTypes.STRING, allowNull: false },
    content: { allowNull: false, type: DataTypes.STRING },
  },
  {
    sequelize: connection,
    modelName: "Posts",
  }
);

Posts.hasMany(Comments, {
  foreignKey: "postId",
  sourceKey: "id",
  hooks: true,
  onUpdate: "cascade",
  onDelete: "cascade",
});

Posts.hasMany(PostLikes, {
  foreignKey: "postId",
  sourceKey: "id",
  hooks: true,
  onUpdate: "cascade",
  onDelete: "cascade",
});

export default Posts;
