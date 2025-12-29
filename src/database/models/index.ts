"use strict";

import config from "../sequelize.config";
import sequelizeConnection from "../connection";
import Users from "./users";
import UserInfos from "./userinfos";
import Posts from "./posts";
import Comments from "./comments";
import PostLikes from "./postlikes";
import CommentLikes from "./commentlike";
import Follows from "./follows";
import BlockUsers from "./blockuser";
import ChatRooms from "./chatrooms";
import Messages from "./messages";
import MessageAlarms from "./messageAlarm";

const Sequelize = require("sequelize");
const db: any = {};
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
db.PostLikes = PostLikes.initModel(sequelizeConnection);
db.CommentLikes = CommentLikes.initModel(sequelizeConnection);
db.Follows = Follows.initModel(sequelizeConnection);
db.ChatRooms = ChatRooms.initModel(sequelizeConnection);
db.Messages = Messages.initModel(sequelizeConnection);
db.MessageAlarms = MessageAlarms.initModel(sequelizeConnection);
db.BlockUsers = BlockUsers.initModel(sequelizeConnection);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
export default db;
