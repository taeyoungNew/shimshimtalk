"use strict";

// const fs = require("fs");
// const path = require("path");
import fs from "fs";
import path from "path";
const Sequelize = require("sequelize");
import process from "process";
import Users from "./users";
import UserInfos from "./userinfos";

const basename = path.basename(__filename);
const db: any = {};
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../sequelize.config.js")[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;