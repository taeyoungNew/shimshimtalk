"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class BlockUsers extends sequelize_1.Model {
    static initModel(sequelize) {
        BlockUsers.init({
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize_1.DataTypes.NUMBER,
            },
            blockerId: {
                allowNull: false,
                type: sequelize_1.DataTypes.UUID,
            },
            blockedId: {
                allowNull: false,
                type: sequelize_1.DataTypes.UUID,
            },
        }, {
            sequelize: sequelize,
            modelName: "BlockUsers",
        });
    }
    static associate(db) {
        BlockUsers.belongsTo(db.Users, {
            foreignKey: "blockerId",
            targetKey: "id",
            onUpdate: "cascade",
            onDelete: "cascade",
        });
        BlockUsers.belongsTo(db.Users, {
            foreignKey: "blockedId",
            targetKey: "id",
            onUpdate: "cascade",
            onDelete: "cascade",
        });
    }
}
// BlockUsers.init(
//   {
//     id: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: DataTypes.NUMBER,
//     },
//     blockerId: {
//       allowNull: false,
//       type: DataTypes.UUID,
//     },
//     blockedId: {
//       allowNull: false,
//       type: DataTypes.UUID,
//     },
//   },
//   {
//     sequelize: connection,
//     modelName: "BlockUsers",
//   }
// );
// BlockUsers.hasMany(Users, {
//   foreignKey: "blockerId",
//   sourceKey: "id",
//   hooks: true,
//   onUpdate: "cascade",
//   onDelete: "cascade",
// });
// BlockUsers.hasMany(Users, {
//   foreignKey: "blockedId",
//   sourceKey: "id",
//   hooks: true,
//   onUpdate: "cascade",
//   onDelete: "cascade",
// });
exports.default = BlockUsers;
