"use strict";
import { Model, DataTypes, Association } from "sequelize";
import connection from "../connection";
import Users from "./users";
import Comments from "./comments";

interface CommentLikeAttributes {
  userId: string;
  commentId: number;
}

class CommentLikes extends Model implements CommentLikeAttributes {
  public userId!: string;
  public commentId!: number;

  static associate() {
    CommentLikes.belongsTo(Users, {
      foreignKey: "userId",
      targetKey: "id",
      onUpdate: "cascade",
      onDelete: "cascade",
    });

    CommentLikes.belongsTo(Comments, {
      foreignKey: "postId",
      targetKey: "id",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  }
}

CommentLikes.init(
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
    commentId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: connection,
    modelName: "CommentLikes",
  }
);

export default CommentLikes;
