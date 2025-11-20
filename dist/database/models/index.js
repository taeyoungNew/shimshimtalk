"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const fs = require("fs");
// const path = require("path");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_config_1 = __importDefault(require("../sequelize.config"));
const users_1 = __importDefault(require("./users"));
const connection_1 = __importDefault(require("../connection"));
const process_1 = __importDefault(require("process"));
const userinfos_1 = __importDefault(require("./userinfos"));
const posts_1 = __importDefault(require("./posts"));
const comments_1 = __importDefault(require("./comments"));
const postlikes_1 = __importDefault(require("./postlikes"));
const commentlike_1 = __importDefault(require("./commentlike"));
const follows_1 = __importDefault(require("./follows"));
const blockuser_1 = __importDefault(require("./blockuser"));
const Sequelize = require("sequelize");
const basename = path_1.default.basename(__filename);
const db = {};
const env = process_1.default.env.NODE_ENV || "development";
let sequelize;
sequelize = new Sequelize(sequelize_config_1.default.database, sequelize_config_1.default.username, sequelize_config_1.default.password, sequelize_config_1.default);
db.Users = users_1.default.initModel(connection_1.default);
db.Follows = follows_1.default.initModel(connection_1.default);
db.UserInfos = userinfos_1.default.initModel(connection_1.default);
db.Posts = posts_1.default.initModel(connection_1.default);
db.Comments = comments_1.default.initModel(connection_1.default);
db.PostLikes = postlikes_1.default.initModel(connection_1.default);
db.CommentLikes = commentlike_1.default.initModel(connection_1.default);
db.BlockUsers = blockuser_1.default.initModel(connection_1.default);
fs_1.default.readdirSync(__dirname)
    .filter((file) => {
    return (file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".js" &&
        file.indexOf(".test.js") === -1);
})
    .forEach((file) => {
    const model = require(path_1.default.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
});
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
exports.default = db;
