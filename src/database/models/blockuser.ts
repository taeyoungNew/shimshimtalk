"use strict";
import { Model, DataTypes, Association } from "sequelize";
import connection from "../connection";
import Users from "./users";

interface BlockUserAttributes {
  blockerId: string;
  blockedId: string;
}

class BlockUsers extends Model implements BlockUserAttributes {
  public blockerId!: string;
  public blockedId!: string;

  static associate() {
    BlockUsers.belongsTo(Users, {
      foreignKey: "blockerId",
      targetKey: "id",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
    BlockUsers.belongsTo(Users, {
      foreignKey: "blockedId",
      targetKey: "id",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  }
}

BlockUsers.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER,
    },
    blockerId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    blockedId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
  },
  {
    sequelize: connection,
    modelName: "BlockUsers",
  }
);

// BlockUsers.hasMany(Users, {
//   foreignKey: "blockerId",
//   sourceKey: "id",
//   hooks: true,
//   onUpdate: "cascade",
//   onDelete: "cascade",
// });
// BlockUsers.hasMany(Users, {
//   foreignKey: "blockedId",
//   sourceKey: "id",
//   hooks: true,
//   onUpdate: "cascade",
//   onDelete: "cascade",
// });

export default BlockUsers;
