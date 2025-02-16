"use strict";
import { DataTypes, QueryInterface } from "sequelize";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("Posts", [
      {
        id: 1,
        userId: "1234",
        title: "시드게시물제목1",
        content: "시드게시물내용1",
        createdAt: "2025-01-23",
        updatedAt: "2025-01-23",
      },
      {
        id: 2,
        userId: "1235",
        title: "시드게시물제목2",
        content: "시드게시물내용2",
        createdAt: "2025-01-23",
        updatedAt: "2025-01-23",
      },
    ]);
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
