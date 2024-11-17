"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // user-userInfo 1:1
      this.hasOne(models.UsersInfo, {
        onDelete: "cascade",
        sourceKey: "id",
        foreignKey: "userId",
      });

      // user-board 1:N
      this.hasMany(models.Boards, {
        onDelete: "cascade",
        sourceKey: "id",
        foreignKey: "userId",
      });

      // follow-following
      this.belongsToMany(models.Users, {
        through: "Follow",
        as: "Followers",
        onDelete: "CASCADE",
      });
      // follow-following
      this.belongsToMany(models.Users, {
        through: "Follow",
        as: "Followings",
        onDelete: "CASCADE",
      });

      // board like
      this.belongsToMany(models.Boards, {
        through: "Likes",
        as: "BoardId",
        foreignKey: "id",
      });

      // comment - User
      this.hasMany(models.comments, {
        sourceKey: "id",
        foreignKey: "userId",
        onDelete: "CASCADE",
      });

      // commentLike - user
      this.belongsToMany(models.comment, {
        through: "commentsLike",
        as: "userId",
        foreignKey: "id",
      });
    }
  }
  Users.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
      refToken: {
        type: DataTypes.STRING,
      },
      refTokenExp: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
