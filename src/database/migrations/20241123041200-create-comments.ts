"use strict";
import { DataTypes, QueryInterface } from "sequelize";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable("Comments", {
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
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: "cascade",
        onDelete: "cascade",
        references: {
          key: "id",
          model: "Posts",
        },
      },
      userNickname: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING(200),
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
    await queryInterface.dropTable("Comments");
  },
};
