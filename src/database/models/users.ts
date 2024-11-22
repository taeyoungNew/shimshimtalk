"use strict";

import { Model, DataTypes } from "sequelize";
import connection from "../connection";

interface UserAttributes {
  email: string;
  password: string;
}

// @Table({
//   timestamps: true,
//   tableName: "users",
//   modelName: "User",
// })
class User extends Model implements UserAttributes {
  public email!: string;
  public password!: string;
}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(30),
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(30),
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: connection,
    modelName: "User",
  }
);

export default User;
