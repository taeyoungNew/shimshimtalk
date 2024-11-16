"use strict";

const users = require("../models/users");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UsersInfos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          key: "id",
          model: "Users",
        },
      },
      username: {
        type: Sequelize.STRING(30),
      },
      nickname: {
        type: Sequelize.STRING(30),
      },
      aboutMe: {
        type: Sequelize.STRING(100),
      },
      age: {
        type: Sequelize.INTEGER,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UsersInfos");
  },
};
