"use strict";

import { Model, Sequelize, DataTypes } from "sequelize";

interface MessagesAttributes {
  id: number;
  senderId: string;
  chatRoomId: string;
  content: string;
  messageType: "TEXT" | "IMAGE" | "FILE";
}

class Messages extends Model implements MessagesAttributes {
  content: string;
  public id: number;
  public senderId: string;
  public chatRoomId: string;
  messageType: "TEXT" | "IMAGE" | "FILE";

  static initModel(sequelize: Sequelize) {
    Messages.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        senderId: {
          allowNull: false,
          type: DataTypes.UUID,
        },
        chatRoomId: {
          allowNull: false,
          type: DataTypes.UUID,
        },
        originalName: {
          type: DataTypes.STRING,
        },
        content: {
          type: DataTypes.STRING(2000), // TEXT는 길어질 수 있으니 2000~허용
          allowNull: false,
        },
        contentType: {
          type: DataTypes.ENUM("TEXT", "IMAGE", "FILE", "SYSTEM"),
          allowNull: false,
          defaultValue: "TEXT",
        },
      },
      {
        sequelize: sequelize,
        modelName: "Messages",
      }
    );
    return Messages;
  }

  static associate(db: any) {
    Messages.belongsTo(db.Users, {
      foreignKey: {
        name: "senderId",
        allowNull: false,
      },
      targetKey: "id",
      foreignKeyConstraint: true,
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    Messages.belongsTo(db.ChatRooms, {
      foreignKey: {
        name: "chatRoomId",
        allowNull: false,
      },
      targetKey: "id",
      foreignKeyConstraint: true,
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    Messages.hasMany(db.MessageAlarms, {
      foreignKey: "messageId",
      sourceKey: "id",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  }
}

export default Messages;
