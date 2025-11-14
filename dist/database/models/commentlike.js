"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class CommentLikes extends sequelize_1.Model {
    static initModel(sequelize) {
        CommentLikes.init({
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
            commentId: {
                allowNull: false,
                type: sequelize_1.DataTypes.INTEGER,
            },
        }, {
            sequelize: sequelize,
            modelName: "CommentLikes",
        });
    }
    static associate(db) {
        CommentLikes.belongsTo(db.Users, {
            foreignKey: "userId",
            targetKey: "id",
            onUpdate: "cascade",
            onDelete: "cascade",
        });
        CommentLikes.belongsTo(db.Comments, {
            foreignKey: "postId",
            targetKey: "id",
            onUpdate: "cascade",
            onDelete: "cascade",
        });
    }
}
// CommentLikes.init(
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
//     commentId: {
//       allowNull: false,
//       type: DataTypes.INTEGER,
//     },
//   },
//   {
//     sequelize: connection,
//     modelName: "CommentLikes",
//   }
// );
exports.default = CommentLikes;
