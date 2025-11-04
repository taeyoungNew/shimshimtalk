"use strict";

import { Model, DataTypes } from "sequelize";
import connection from "../connection";
import Users from "./users";

interface FollowsAttributes {
  followingId: string;
  followerId: string;
}

class Follows extends Model implements FollowsAttributes {
  public followerId!: string;
  public followingId!: string;

  static associate() {
    Follows.belongsTo(Users, {
      foreignKey: "followingId",
      targetKey: "id",
      as: "Followings",
      onUpdate: "cascade",
      onDelete: "cascade",
    });

    Follows.belongsTo(Users, {
      foreignKey: "followerId",
      targetKey: "id",
      as: "Followers",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  }
}

Follows.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER,
    },
    followerId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    followingId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
  },
  {
    sequelize: connection,
    modelName: "Follows",
  }
);

export default Follows;
