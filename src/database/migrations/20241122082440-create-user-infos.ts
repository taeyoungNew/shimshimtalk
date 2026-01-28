"use strict";

import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable("UserInfos", {
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
      profileUrl: {
        defaultValue: "",
        allowNull: true,
        type: Sequelize.STRING,
      },
      backgroundUrl: {
        defaultValue: "",
        allowNull: true,
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING(30),
      },
      nickname: {
        unique: true,
        type: Sequelize.STRING(30),
      },
      aboutMe: {
        type: Sequelize.STRING(500),
      },
      age: {
        type: Sequelize.INTEGER({
          length: 100,
        }),
      },
      profileUrlUpdatedAt: {
        type: Sequelize.DATE,
      },
      backgroundUrlUpdatedAt: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("UserInfos");
  },
};
