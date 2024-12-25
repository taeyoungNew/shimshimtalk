"use strict";
import { Model, DataTypes, Association } from "sequelize";
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

  static associate() {
    PostLikes.belongsTo(Users, {
      foreignKey: "userId",
      targetKey: "id",
    });

    PostLikes.belongsTo(Posts, {
      foreignKey: "postId",
      targetKey: "id",
    });
  }
}

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
    sequelize: connection,
    modelName: "PostLikes",
  }
);

export default PostLikes;

// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class PostLikes extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   PostLikes.init({
//     userId: DataTypes.INTEGER,
//     postId: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'PostLikes',
//   });
//   return PostLikes;
// };
