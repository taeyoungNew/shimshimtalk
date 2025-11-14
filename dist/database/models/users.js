"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Users extends sequelize_1.Model {
    // public static associations: { UserInfos: Association<Users, UserInfos> };
    static initModel(sequelize) {
        Users.init({
            id: {
                allowNull: false,
                primaryKey: true,
                type: sequelize_1.DataTypes.UUID,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
            },
            email: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING,
                unique: true,
            },
            password: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING(100),
            },
            refToken: {
                type: sequelize_1.DataTypes.STRING,
            },
            refTokenExp: {
                type: sequelize_1.DataTypes.DATE,
            },
            createdAt: {
                allowNull: false,
                type: sequelize_1.DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: sequelize_1.DataTypes.DATE,
            },
        }, {
            sequelize: sequelize,
            modelName: "User",
        });
        return Users;
    }
    static associate(db) {
        console.log("associate = ", db.Users);
        // following follower
        Users.belongsToMany(db.Users, {
            as: "Followers",
            through: db.Follows,
            foreignKey: "followingId",
            otherKey: "followerId",
            onUpdate: "cascade",
            onDelete: "cascade",
        });
        Users.belongsToMany(db.Users, {
            as: "Followings",
            through: db.Follows,
            foreignKey: "followerId",
            otherKey: "followingId",
            onUpdate: "cascade",
            onDelete: "cascade",
        });
        Users.belongsToMany(db.BlockUsers, {
            as: "blockerId",
            through: "BlockUsers",
            onUpdate: "cascade",
            onDelete: "cascade",
        });
        Users.belongsToMany(db.BlockUsers, {
            as: "blockedId",
            through: "BlockUsers",
            onUpdate: "cascade",
            onDelete: "cascade",
        });
        Users.belongsToMany(db.CommentLikes, {
            through: "CommentLikes",
            as: "commentId",
            onUpdate: "cascade",
            onDelete: "cascade",
        });
        // 유저정보
        Users.hasOne(db.UserInfos, {
            foreignKey: "userId",
            sourceKey: "id",
            hooks: true,
            onUpdate: "cascade",
            onDelete: "cascade",
        });
        // 게시물
        Users.hasMany(db.Posts, {
            foreignKey: "userId",
            sourceKey: "id",
            hooks: true,
            onUpdate: "cascade",
            onDelete: "cascade",
        });
        // 게시물좋아요
        Users.hasMany(db.PostLikes, {
            foreignKey: "userId",
            sourceKey: "id",
            hooks: true,
            onUpdate: "cascade",
            onDelete: "cascade",
        });
        // 댓글
        Users.hasMany(db.Comments, {
            foreignKey: "userId",
            sourceKey: "id",
            hooks: true,
            onUpdate: "cascade",
            onDelete: "cascade",
        });
        //  follow
        // Users.hasMany(db.Follows, {
        //   foreignKey: "followingId",
        //   sourceKey: "id",
        //   hooks: true,
        //   onUpdate: "cascade",
        //   onDelete: "cascade",
        // });
        // Users.hasMany(db.Follows, {
        //   foreignKey: "followerId",
        //   sourceKey: "id",
        //   hooks: true,
        //   onUpdate: "cascade",
        //   onDelete: "cascade",
        // });
        Users.hasMany(db.BlockUsers, {
            foreignKey: "blockerId",
            sourceKey: "id",
            hooks: true,
            onUpdate: "cascade",
            onDelete: "cascade",
        });
        Users.hasMany(db.BlockUsers, {
            foreignKey: "blockedId",
            sourceKey: "id",
            hooks: true,
            onUpdate: "cascade",
            onDelete: "cascade",
        });
    }
}
// Users.init(
//   {
//     id: {
//       allowNull: false,
//       // autoIncrement: true,
//       primaryKey: true,
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//     },
//     email: {
//       allowNull: false,
//       type: DataTypes.STRING,
//       unique: true,
//     },
//     password: {
//       allowNull: false,
//       type: DataTypes.STRING(100),
//     },
//     refToken: {
//       type: DataTypes.STRING,
//     },
//     refTokenExp: {
//       type: DataTypes.DATE,
//     },
//     createdAt: {
//       allowNull: false,
//       type: DataTypes.DATE,
//     },
//     updatedAt: {
//       allowNull: false,
//       type: DataTypes.DATE,
//     },
//   },
//   {
//     sequelize: connection,
//     modelName: "User",
//   }
// );
// // 유저정보
// Users.hasOne(UserInfos, {
//   foreignKey: "userId",
//   sourceKey: "id",
//   hooks: true,
//   onUpdate: "cascade",
//   onDelete: "cascade",
// });
// // 게시물
// Users.hasMany(Posts, {
//   foreignKey: "userId",
//   sourceKey: "id",
//   hooks: true,
//   onUpdate: "cascade",
//   onDelete: "cascade",
// });
// // 게시물좋아요
// Users.hasMany(PostLikes, {
//   foreignKey: "userId",
//   sourceKey: "id",
//   hooks: true,
//   onUpdate: "cascade",
//   onDelete: "cascade",
// });
// // 댓글
// Users.hasMany(Comments, {
//   foreignKey: "userId",
//   sourceKey: "id",
//   hooks: true,
//   onUpdate: "cascade",
//   onDelete: "cascade",
// });
// //  follow
// // Users.hasMany(Follows, {
// //   foreignKey: "followingId",
// //   sourceKey: "id",
// //   hooks: true,
// //   onUpdate: "cascade",
// //   onDelete: "cascade",
// // });
// // Users.hasMany(Follows, {
// //   foreignKey: "followerId",
// //   sourceKey: "id",
// //   hooks: true,
// //   onUpdate: "cascade",
// //   onDelete: "cascade",
// // });
// Users.hasMany(BlockUsers, {
//   foreignKey: "blockerId",
//   sourceKey: "id",
//   hooks: true,
//   onUpdate: "cascade",
//   onDelete: "cascade",
// });
// Users.hasMany(BlockUsers, {
//   foreignKey: "blockedId",
//   sourceKey: "id",
//   hooks: true,
//   onUpdate: "cascade",
//   onDelete: "cascade",
// });
exports.default = Users;
