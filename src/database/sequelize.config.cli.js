// import {
//   DB_DATABASE,
//   DB_HOST,
//   DB_PASSWORD,
//   DB_USERNAME,
//   DB_PORT,
//   DB_DIALECT,
// } from "../config";

require("dotenv").config();

module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT, // Sequelize.Dialect 타입 지정 가능
};

// export default config;
