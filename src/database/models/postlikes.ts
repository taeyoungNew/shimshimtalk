"use strict";
import { Model, DataTypes, Association, Sequelize } from "sequelize";
import connection from "../connection";
import Users from "./users";
import Posts from "./posts";

interface PostLikeAttributes {
  userId: string;
  postId: number;
}

class PostLikes extends Model implements PostLikeAttributes {
  public userId!: string;
  public postId!: number;

  static initModel(sequelize: Sequelize) {
    PostLikes.init(
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
        postId: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize: sequelize,
        modelName: "PostLikes",
      }
    );
    return PostLikes;
  }

  static associate(db: any) {
    PostLikes.belongsTo(db.Users, {
      foreignKey: "userId",
      targetKey: "id",
      onUpdate: "cascade",
      onDelete: "cascade",
    });

    PostLikes.belongsTo(db.Posts, {
      foreignKey: "postId",
      targetKey: "id",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  }
}

// PostLikes.init(
//   {
//     id: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: DataTypes.NUMBER,
//     },
//     userId: {
//       allowNull: false,
//       type: DataTypes.UUID,
//     },
//     postId: {
//       allowNull: false,
//       type: DataTypes.INTEGER,
//     },
//   },
//   {
//     sequelize: connection,
//     modelName: "PostLikes",
//   }
// );

export default PostLikes;
