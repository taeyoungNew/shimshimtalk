"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Follows extends sequelize_1.Model {
    static initModel(sequelize) {
        Follows.init({
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize_1.DataTypes.NUMBER,
            },
            followerId: {
                allowNull: false,
                type: sequelize_1.DataTypes.UUID,
            },
            followingId: {
                allowNull: false,
                type: sequelize_1.DataTypes.UUID,
            },
        }, {
            sequelize: sequelize,
            modelName: "Follows",
        });
    }
    static associate(db) {
        Follows.belongsTo(db.Users, {
            foreignKey: "followingId",
            onUpdate: "cascade",
            onDelete: "cascade",
        });
        Follows.belongsTo(db.Users, {
            foreignKey: "followerId",
            onUpdate: "cascade",
            onDelete: "cascade",
        });
        // Follows.belongsTo(Users, {
        //   foreignKey: "followingId",
        //   targetKey: "id",
        //   as: "Followings",
        //   onUpdate: "cascade",
        //   onDelete: "cascade",
        // });
        // Follows.belongsTo(Users, {
        //   foreignKey: "followerId",
        //   targetKey: "id",
        //   as: "Followers",
        //   onUpdate: "cascade",
        //   onDelete: "cascade",
        // });
    }
}
// Follows.init(
//   {
//     id: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: DataTypes.NUMBER,
//     },
//     followerId: {
//       allowNull: false,
//       type: DataTypes.UUID,
//     },
//     followingId: {
//       allowNull: false,
//       type: DataTypes.UUID,
//     },
//   },
//   {
//     sequelize: connection,
//     modelName: "Follows",
//   }
// );
exports.default = Follows;
