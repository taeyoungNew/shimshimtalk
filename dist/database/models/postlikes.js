"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class PostLikes extends sequelize_1.Model {
    static initModel(sequelize) {
        PostLikes.init({
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
        }, {
            sequelize: sequelize,
            modelName: "PostLikes",
        });
    }
    static associate(db) {
        PostLikes.belongsTo(db.Users, {
            foreignKey: "userId",
            targetKey: "id",
            onUpdate: "cascade",
            onDelete: "cascade",
        });
        PostLikes.belongsTo(db.Posts, {
            foreignKey: "postId",
            targetKey: "id",
            onUpdate: "cascade",
            onDelete: "cascade",
        });
    }
}
// PostLikes.init(
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
//   },
//   {
//     sequelize: connection,
//     modelName: "PostLikes",
//   }
// );
exports.default = PostLikes;
