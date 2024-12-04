"use strict";
import { Model, DataTypes, Association } from "sequelize";
import connection from "../connection";
import Users from "./users";
import Posts from "./posts";

interface PostLikeAttributes {
  userId: number;
  postId: number;
}

class PostLikes extends Model implements PostLikeAttributes {
  public userId!: number;
  public postId!: number;
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
      type: DataTypes.INTEGER,
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

// PostLikes.belongsTo(Users, {
//   foreignKey: "userId",
//   targetKey: "id",
// });

// PostLikes.belongsTo(Posts, {
//   foreignKey: "postId",
//   targetKey: "id",
// });

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
