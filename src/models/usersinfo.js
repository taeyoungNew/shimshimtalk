"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UsersInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // userinfo - user
      this.belongsTo(models.Users, {
        targetKey: id,
        foreignKey: {
          name: "userId",
          allowNull: false,
        },
      });
    }
  }
  UsersInfo.init(
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
        references: {
          key: "id",
          model: "Users",
        },
      },
      username: DataTypes.STRING(30),
      nickname: DataTypes.STRING(30),
      aboutMe: DataTypes.STRING(300),
      age: DataTypes.INTEGER(100),
    },
    {
      sequelize,
      modelName: "UsersInfo",
    }
  );
  return UsersInfo;
};
