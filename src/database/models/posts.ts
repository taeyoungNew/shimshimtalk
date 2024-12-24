"use strict";

import { Model, DataTypes, Association } from "sequelize";
import connection from "../connection";
import Users from "./users";

interface PostsAttributes {
  userId: string;
  title: string;
  content: string;
}

class Posts extends Model implements PostsAttributes {
  public userId!: string;
  public title!: string;
  public content!: string;

  static associate() {}
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
    title: { type: DataTypes.STRING, allowNull: false },
    content: { allowNull: false, type: DataTypes.STRING },
  },
  {
    sequelize: connection,
    modelName: "Posts",
  }
);

// user - post
Posts.belongsTo(Users, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  targetKey: "id",
  foreignKeyConstraint: true,
  onDelete: "cascade",
});

// post - like
Posts.belongsToMany(Users, {
  through: "PostLikes",
  as: "postId",
  onDelete: "cascade",
});

export default Posts;
