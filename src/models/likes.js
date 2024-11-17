"use strict";
const { Model } = require("sequelize");
const users = require("./users");
const boards = require("./boards");
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // user
      this.belongsTo(models.users, {
        foreignKey: "userId",
        targetKey: "id",
        onDelete: "CASCADE",
      });
      // board
      this.belongsTo(models.boards, {
        foreignKey: "boardId",
        targetKey: "id",
        onDelete: "CASCADE",
      });
    }
  }
  Likes.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
        // references: {
        //   key: id,
        //   model: users,
        // },
      },
      boardId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        // references: {
        //   key: id,
        //   model: boards,
        // },
      },
    },
    {
      sequelize,
      modelName: "Likes",
    }
  );
  return Likes;
};
