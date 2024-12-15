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

// CommentLikes.belongsTo(Users, {
//   foreignKey: "userId",
//   targetKey: "id",
// });

// CommentLikes.belongsTo(Comments, {
//   foreignKey: "postId",
//   targetKey: "id",
// });

export default CommentLikes;
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class CommentLike extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   CommentLike.init(
//     {
//       userId: DataTypes.INTEGER,
//       commentId: DataTypes.INTEGER,
//     },
//     {
//       sequelize,
//       modelName: "CommentLike",
//     }
//   );
//   return CommentLike;
// };
