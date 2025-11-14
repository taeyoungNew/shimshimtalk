"use strict";

// const fs = require("fs");
// const path = require("path");
import fs from "fs";
import path from "path";
import config from "../sequelize.config";
import sequelizeConnection from "../connection";
import process from "process";
import Users from "./users";
import UserInfos from "./userinfos";
import Posts from "./posts";
import Comments from "./comments";
import PostLikes from "./postlikes";
import CommentLikes from "./commentlike";
import Follows from "./follows";
import BlockUsers from "./blockuser";

const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const db: any = {};
const env = process.env.NODE_ENV || "development";

let sequelize;

sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.Users = Users.initModel(sequelizeConnection);
db.UserInfos = UserInfos.initModel(sequelizeConnection);
db.Posts = Posts.initModel(sequelizeConnection);
db.Comments = Comments.initModel(sequelizeConnection);
db.Follows = Follows.initModel(sequelizeConnection);
db.PostLikes = PostLikes.initModel(sequelizeConnection);
db.CommentLikes = CommentLikes.initModel(sequelizeConnection);
db.BlockUsers = BlockUsers.initModel(sequelizeConnection);

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 &&
//       file !== basename &&
//       file.slice(-3) === ".js" &&
//       file.indexOf(".test.js") === -1
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// export const sequelizeInstance = sequelize;
// export const SequelizeLib = Sequelize;
module.exports = db;
export default db;
