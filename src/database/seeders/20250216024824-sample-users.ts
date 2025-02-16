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
     *
     */
    await queryInterface.bulkInsert("Users", [
      {
        id: "1234",
        email: "seedEmail1@test.com",
        password: 1234,
        createdAt: "2025-01-23",
        updatedAt: "2025-01-23",
      },
      {
        id: "1235",
        email: "seedEmail2@test.com",
        password: 1234,
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
