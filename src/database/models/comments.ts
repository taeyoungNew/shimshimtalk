"use strict";
import { Model, DataTypes, Association } from "sequelize";
import connection from "../connection";
import Users from "./users";
import Posts from "./posts";

interface CommentsAttributes {
  userId: number;
  postId: number;
  content: string;
}

class Comments extends Model implements CommentsAttributes {
  public userId!: number;
  public postId!: number;
  public content!: string;
}

Comments.init(
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
    content: DataTypes.STRING,
  },
  {
    sequelize: connection,
    modelName: "Comments",
  }
);

export default Comments;

// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Comments extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Comments.init({
//     userId: DataTypes.INTEGER,
//     postId: DataTypes.INTEGER,
//     content: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Comments',
//   });
//   return Comments;
// };
