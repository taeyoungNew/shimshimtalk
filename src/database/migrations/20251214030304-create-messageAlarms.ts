"use strict";

import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable("MessageAlarms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        onUpdate: "cascade",
        onDelete: "cascade",
        references: {
          key: "id",
          model: "Users",
        },
      },
      chatRoomId: {
        allowNull: false,
        type: Sequelize.UUID,
        onUpdate: "cascade",
        onDelete: "cascade",
        references: {
          key: "id",
          model: "ChatRooms",
        },
      },
      messageId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: "cascade",
        onDelete: "cascade",
        references: {
          key: "id",
          model: "Messages",
        },
      },
      isRead: {
        allowNull: false,
        type: Sequelize.TINYINT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.dropTable("MessageAlarms");
  },
};
