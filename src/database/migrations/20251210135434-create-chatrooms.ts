"use strict";

import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable("ChatRooms", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userAId: {
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: "cascade",
        onUpdate: "cascade",
        references: {
          key: "id",
          model: "Users",
        },
      },
      userBId: {
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: "cascade",
        onUpdate: "cascade",
        references: {
          key: "id",
          model: "Users",
        },
      },
      pairKey: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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
    await queryInterface.dropTable("ChatRooms");
  },
};
