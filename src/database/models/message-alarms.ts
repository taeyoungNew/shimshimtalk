"use strict";

import { Model, Sequelize, DataTypes } from "sequelize";

interface MessageAlarmAttributes {
  id: number;
  userId: string;
  chatRoomId: string;
  messageId: number;
  isRead: boolean;
}

class MessageAlarms extends Model implements MessageAlarmAttributes {
  public id: number;
  public userId: string;
  public chatRoomId: string;
  public messageId: number;
  public isRead: boolean;

  static initModel(sequelize: Sequelize) {
    MessageAlarms.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.UUID,
        },
        userId: {
          allowNull: false,
          type: DataTypes.UUID,
        },
        chatRoomId: {
          allowNull: false,
          type: DataTypes.UUID,
        },
        messageId: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        isRead: {
          allowNull: false,
          type: DataTypes.TINYINT,
          defaultValue: false,
        },
      },
      {
        sequelize: sequelize,
        modelName: "MessageAlarms",
      }
    );
    return MessageAlarms;
  }

  static associate(db: any) {
    MessageAlarms.belongsTo(db.Users, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      targetKey: "id",
      foreignKeyConstraint: true,
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    MessageAlarms.belongsTo(db.ChatRooms, {
      foreignKey: {
        name: "chatRoomId",
        allowNull: false,
      },
      targetKey: "id",
      foreignKeyConstraint: true,
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    MessageAlarms.belongsTo(db.ChatRooms, {
      foreignKey: {
        name: "messageId",
        allowNull: false,
      },
      targetKey: "id",
      foreignKeyConstraint: true,
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  }
}

export default MessageAlarms;
