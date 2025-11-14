"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const users_1 = __importDefault(require("./users"));
class UserInfos extends sequelize_1.Model {
    static initModel(sequelize) {
        return UserInfos.init({
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize_1.DataTypes.INTEGER,
            },
            userId: {
                allowNull: false,
                type: sequelize_1.DataTypes.UUID,
                references: {
                    model: users_1.default,
                    key: "id",
                },
            },
            username: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING,
            },
            nickname: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING,
            },
            aboutMe: {
                type: sequelize_1.DataTypes.STRING,
            },
            age: sequelize_1.DataTypes.INTEGER({
                length: 100,
            }),
            createdAt: {
                allowNull: false,
                type: sequelize_1.DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: sequelize_1.DataTypes.DATE,
            },
        }, { sequelize: sequelize, modelName: "UserInfo" });
    }
    static associate(db) {
        UserInfos.belongsTo(db.Users, {
            foreignKey: "userId",
            targetKey: "id",
            onUpdate: "cascade",
            onDelete: "cascade",
        });
    }
}
// UserInfos.init(
//   {
//     id: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: DataTypes.INTEGER,
//     },
//     userId: {
//       allowNull: false,
//       type: DataTypes.UUID,
//       references: {
//         model: Users,
//         key: "id",
//       },
//     },
//     username: {
//       allowNull: false,
//       type: DataTypes.STRING,
//     },
//     nickname: {
//       allowNull: false,
//       type: DataTypes.STRING,
//     },
//     aboutMe: {
//       type: DataTypes.STRING,
//     },
//     age: DataTypes.INTEGER({
//       length: 100,
//     }),
//     createdAt: {
//       allowNull: false,
//       type: DataTypes.DATE,
//     },
//     updatedAt: {
//       allowNull: false,
//       type: DataTypes.DATE,
//     },
//   },
//   { sequelize: connection, modelName: "UserInfo" }
// );
// user - userinfo
exports.default = UserInfos;
