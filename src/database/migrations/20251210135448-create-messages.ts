"use strict";

import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable("Messages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      senderId: {
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
      originalName: {
        type: Sequelize.TEXT,
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      contentType: {
        type: Sequelize.ENUM("TEXT", "IMAGE", "FILE", "SYSTEM"),
        allowNull: false,
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
    await queryInterface.dropTable("Messages");
  },
};
