"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // comment - user
      this.belongsToMany(models.Users, {
        targetKey: "id",
        foreignKey: {
          name: "userId",
          allowNull: false,
        },
      });

      // comment - board
      this.belongsToMany(models.Boards, {
        targetKey: "id",
        foreignKey: {
          name: "boardId",
          allowNull: false,
        },
      });

      // comment like
      this.belongsToMany(models.Users, {
        through: "commentsLike",
        as: "commentId",
        foreignKey: "id",
      });
    }
  }
  comments.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      commentContent: DataTypes.STRING(200),
      userId: {
        allowNull: false,
        type: DataTypes.STRING,
        // references: {
        //   key: "id",
        //   model: "Users",
        // },
      },
      boardId: {
        allowNull: false,
        type: DataTypes.STRING,
        // references: {
        //   key: "id",
        //   model: "Boards",
        // },
      },
    },
    {
      sequelize,
      modelName: "comments",
    }
  );
  return comments;
};
