"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Boards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // User - Board
      this.belongsToMany(models.Users, {
        targetKey: "id",
        foreignKey: {
          name: "userId",
          allowNull: false,
        },
      });

      // Board like
      this.belongsToMany(models.Users, {
        through: "Likes",
        as: "UserId",
        foreignKey: "id",
      });

      // Board - comment
      this.hasMany(models.comments, {
        onDelete: "cascade",
        sourceKey: "id",
        foreignKey: "boardId",
      });
    }
  }
  Boards.init(
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
      title: DataTypes.STRING(50),
      contents: DataTypes.STRING(400),
    },
    {
      sequelize,
      modelName: "Boards",
    }
  );
  return Boards;
};
