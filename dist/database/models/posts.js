"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../models/index"));
class Posts extends sequelize_1.Model {
    static initModel(sequelize) {
        Posts.init({
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize_1.DataTypes.NUMBER,
            },
            userId: {
                allowNull: false,
                type: sequelize_1.DataTypes.UUID,
            },
            content: { allowNull: false, type: sequelize_1.DataTypes.STRING },
        }, {
            sequelize: sequelize,
            modelName: "Posts",
        });
    }
    static associate() {
        // user - post
        Posts.belongsTo(index_1.default.Users, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
            targetKey: "id",
            foreignKeyConstraint: true,
            onUpdate: "cascade",
            onDelete: "cascade",
        });
        Posts.hasMany(index_1.default.Comments, {
            foreignKey: "postId",
            sourceKey: "id",
            hooks: true,
            onUpdate: "cascade",
            onDelete: "cascade",
        });
        Posts.hasMany(index_1.default.PostLikes, {
            foreignKey: "postId",
            sourceKey: "id",
            hooks: true,
            onUpdate: "cascade",
            onDelete: "cascade",
        });
    }
}
// Posts.init(
//   {
//     id: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: DataTypes.NUMBER,
//     },
//     userId: {
//       allowNull: false,
//       type: DataTypes.UUID,
//     },
//     content: { allowNull: false, type: DataTypes.STRING },
//   },
//   {
//     sequelize: connection,
//     modelName: "Posts",
//   }
// );
// Posts.hasMany(Comments, {
//   foreignKey: "postId",
//   sourceKey: "id",
//   hooks: true,
//   onUpdate: "cascade",
//   onDelete: "cascade",
// });
// Posts.hasMany(PostLikes, {
//   foreignKey: "postId",
//   sourceKey: "id",
//   hooks: true,
//   onUpdate: "cascade",
//   onDelete: "cascade",
// });
exports.default = Posts;
