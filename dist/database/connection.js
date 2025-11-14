"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
const sequelizeConnection = new sequelize_1.Sequelize(config_1.DB_DATABASE, config_1.DB_USERNAME, config_1.DB_PASSWORD, {
    host: config_1.DB_HOST,
    dialect: "mysql",
    port: Number(config_1.DB_PORT),
});
exports.default = sequelizeConnection;
