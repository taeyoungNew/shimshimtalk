"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("comments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      commentContent: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          key: "id",
          model: "Users",
        },
      },
      boardId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "Boards",
        },
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
    await queryInterface.dropTable("comments");
  },
};
