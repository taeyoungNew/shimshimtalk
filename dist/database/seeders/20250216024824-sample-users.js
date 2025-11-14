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
             *
             */
            yield queryInterface.bulkInsert("Users", [
                {
                    id: "1234",
                    email: "seedEmail1@test.com",
                    password: "$2b$10$XnNy8WYA2/JXQQEKZX9VmOEH71x/pXbjqZEhOCEcRtiXyPsSmuZdS",
                    refToken: "",
                    refTokenExp: "2025-01-25",
                    createdAt: "2025-01-23",
                    updatedAt: "2025-01-23",
                },
                {
                    id: "1235",
                    email: "seedEmail2@test.com",
                    password: "$2b$10$XnNy8WYA2/JXQQEKZX9VmOEH71x/pXbjqZEhOCEcRtiXyPsSmuZdS",
                    refToken: "",
                    refTokenExp: "2025-01-24",
                    createdAt: "2025-01-25",
                    updatedAt: "2025-01-25",
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
