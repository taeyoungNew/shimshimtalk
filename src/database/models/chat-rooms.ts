"use strict";

import { Model, Sequelize, DataTypes } from "sequelize";

interface ChatRoomsAttributes {
  id: string;
  userAId: string;
  userBId: string;
}

class ChatRooms extends Model implements ChatRoomsAttributes {
  public id: string;
  public userAId: string;
  public userBId: string;

  static initModel(sequelize: Sequelize) {
    ChatRooms.init(
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        userAId: {
          allowNull: false,
          type: DataTypes.UUID,
        },
        userBId: {
          allowNull: false,
          type: DataTypes.UUID,
        },
        pairKey: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize: sequelize,
        modelName: "ChatRooms",
      }
    );
    return ChatRooms;
  }
  static associate(db: any) {
    ChatRooms.hasMany(db.Messages, {
      foreignKey: "chatRoomId",
      sourceKey: "id",
      hooks: true,
      onUpdate: "cascade",
      onDelete: "cascade",
    });
    ChatRooms.hasMany(db.MessageAlarms, {
      foreignKey: "chatRoomId",
      sourceKey: "id",
      hooks: true,
      onUpdate: "cascade",
      onDelete: "cascade",
    });
    ChatRooms.belongsTo(db.Users, {
      foreignKey: {
        name: "userAId",
        allowNull: false,
      },
      targetKey: "id",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
    ChatRooms.belongsTo(db.Users, {
      foreignKey: {
        name: "userBId",
        allowNull: false,
      },
      targetKey: "id",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  }
}

export default ChatRooms;
