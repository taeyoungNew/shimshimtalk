"use strict";

import { Model, DataTypes, Sequelize } from "sequelize";
import db from "../models/index";
import connection from "../connection";
import Users from "./users";

interface FollowsAttributes {
  followingId: string;
  followerId: string;
}

class Follows extends Model implements FollowsAttributes {
  public followerId!: string;
  public followingId!: string;

  static initModel(sequelize: Sequelize) {
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
        sequelize: sequelize,
        modelName: "Follows",
      }
    );
    return Follows;
  }

  static associate(db: any) {
    Follows.belongsTo(db.Users, {
      foreignKey: "followingId",
      onUpdate: "cascade",
      onDelete: "cascade",
    });

    Follows.belongsTo(db.Users, {
      foreignKey: "followerId",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  }
}

export default Follows;
