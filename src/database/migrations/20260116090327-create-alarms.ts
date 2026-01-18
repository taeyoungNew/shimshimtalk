"use strict";

import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable("Alarms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      senderId: { allowNull: false, type: Sequelize.UUID },
      receiverId: { allowNull: false, type: Sequelize.UUID },
      alarmType: {
        allowNull: false,
        type: Sequelize.ENUM("FOLLOW", "LIKE", "COMMENT", "SYSTEM"),
      },
      targetId: { allowNull: false, type: Sequelize.STRING },
      targetType: {
        allowNull: false,
        type: Sequelize.ENUM("USER", "POST", "COMMENT", "SYSTEM"),
      },
      isRead: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable("Alarms");
  },
};
