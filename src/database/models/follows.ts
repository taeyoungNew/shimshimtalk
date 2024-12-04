"use strict";

import { Model, DataTypes, Association } from "sequelize";
import connection from "../connection";
import Users from "./users";

interface FollowsAttributes {
  followingId: number;
  followerId: number;
}

class Follows extends Model implements FollowsAttributes {
  public followerId!: number;
  public followingId!: number;
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
      type: DataTypes.INTEGER,
    },
    followingId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: connection,
    modelName: "Follows",
  }
);

// Follows.belongsTo(Users, {
//   foreignKey: "followerId",
//   targetKey: "id",
// });

// Follows.belongsTo(Users, {
//   foreignKey: "followingId",
//   targetKey: "id",
// });

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
