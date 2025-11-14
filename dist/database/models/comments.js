"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Comments extends sequelize_1.Model {
    static initModel(sequelize) {
        Comments.init({
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
            postId: {
                allowNull: false,
                type: sequelize_1.DataTypes.INTEGER,
            },
            userNickname: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING,
            },
            content: sequelize_1.DataTypes.STRING,
        }, {
            sequelize: sequelize,
            modelName: "Comments",
        });
    }
    static associate(db) {
        Comments.belongsTo(db.Posts, {
            foreignKey: "postId",
            targetKey: "id",
            onUpdate: "cascade",
            onDelete: "cascade",
        });
        Comments.belongsTo(db.Users, {
            foreignKey: "userId",
            targetKey: "id",
            onUpdate: "cascade",
            onDelete: "cascade",
        });
        Comments.belongsToMany(db.CommentLikes, {
            through: "CommentLikes",
            as: "commentId",
            onUpdate: "cascade",
            onDelete: "cascade",
        });
    }
}
// Comments.init(
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
//     postId: {
//       allowNull: false,
//       type: DataTypes.INTEGER,
//     },
//     userNickname: {
//       allowNull: false,
//       type: DataTypes.STRING,
//     },
//     content: DataTypes.STRING,
//   },
//   {
//     sequelize: connection,
//     modelName: "Comments",
//   }
// );
exports.default = Comments;
