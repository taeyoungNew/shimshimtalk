"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class commentLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, {
        foreignKey: "userId",
        targetKey: "id",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.comments, {
        foreignKey: "commentId",
        targetKey: "id",
        onDelete: "CASCADE",
      });
    }
  }
  commentLike.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        // references: {
        //   key: "id",
        //   model: "Users",
        // },
      },
      commentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // referencesx
      },
    },
    {
      sequelize,
      modelName: "commentLike",
    }
  );
  return commentLike;
};
