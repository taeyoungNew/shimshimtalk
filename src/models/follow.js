"use strict";
const { Model } = require("sequelize");
const users = require("./users");
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, {
        foreignKey: "followingId",
        targetKey: id,
      });
      this.belongsTo(models.users, {
        foreignKey: "followerId",
        targetKey: "id",
      });
    }
  }
  Follow.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      followingId: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: users,
          key: id,
        },
      },
      followerId: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: users,
          key: id,
        },
      },
    },
    {
      sequelize,
      modelName: "Follow",
    }
  );
  return Follow;
};
