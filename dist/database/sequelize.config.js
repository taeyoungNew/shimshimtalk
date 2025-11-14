"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("ts-node/register");
require("dotenv").config();
const {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_USERNAME,
  DB_PORT,
  DB_DIALECT,
} = require("../config");
module.exports = {
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT, // Sequelize.Dialect 타입 지정 가능
};
