"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Add seed commands here.
             *
             * Example:
             * await queryInterface.bulkInsert('People', [{
             *   name: 'John Doe',
             *   isBetaMember: false
             * }], {});
             */
            yield queryInterface.bulkInsert("Posts", [
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
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Add commands to revert seed here.
             *
             * Example:
             * await queryInterface.bulkDelete('People', null, {});
             */
        });
    },
};
