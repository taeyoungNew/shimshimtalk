"use strict";

import { Model, DataTypes, Association } from "sequelize";
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
      foreignKey: "followerId",
      targetKey: "id",
      onUpdate: "cascade",
      onDelete: "cascade",
    });

    Follows.belongsTo(Users, {
      foreignKey: "followingId",
      targetKey: "id",
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

// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class Follows extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Follows.init(
//     {
//       follower: DataTypes.INTEGER,
//       followings: DataTypes.INTEGER,
//     },
//     {
//       sequelize,
//       modelName: "Follows",
//     }
//   );
//   return Follows;
// };
