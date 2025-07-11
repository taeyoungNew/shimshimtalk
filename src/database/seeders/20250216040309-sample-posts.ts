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
        createdAt: "2025-01-24",
        updatedAt: "2025-01-24",
      },
      {
        id: 3,
        userId: "1235",
        title: "시드게시물제목3",
        content: "시드게시물내용3",
        createdAt: "2025-01-27",
        updatedAt: "2025-01-27",
      },
      {
        id: 4,
        userId: "1235",
        title: "시드게시물제목4",
        content: "시드게시물내용4",
        createdAt: "2025-05-23",
        updatedAt: "2025-05-24",
      },
      {
        id: 5,
        userId: "1235",
        title: "시드게시물제목5",
        content: "시드게시물내용5",
        createdAt: "2025-07-01",
        updatedAt: "2025-07-01",
      },
      {
        id: 6,
        userId: "1235",
        title: "시드게시물제목6",
        content: "시드게시물내용6",
        createdAt: "2025-07-01",
        updatedAt: "2025-07-01",
      },
      {
        id: 7,
        userId: "1235",
        title: "시드게시물제목7",
        content: "시드게시물내용7",
        createdAt: "2025-07-02",
        updatedAt: "2025-07-02",
      },
      {
        id: 8,
        userId: "1234",
        title: "시드게시물제목8",
        content: "시드게시물내용8",
        createdAt: "2025-07-03",
        updatedAt: "2025-07-03",
      },
      {
        id: 9,
        userId: "1234",
        title: "시드게시물제목9",
        content: "시드게시물내용9",
        createdAt: "2025-07-04",
        updatedAt: "2025-07-04",
      },
      {
        id: 10,
        userId: "1234",
        title: "시드게시물제목10",
        content: "시드게시물내용10",
        createdAt: "2025-07-05",
        updatedAt: "2025-07-05",
      },
      {
        id: 11,
        userId: "1234",
        title: "시드게시물제목11",
        content: "시드게시물내용11",
        createdAt: "2025-07-06",
        updatedAt: "2025-07-06",
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
