"use strict";

import { Model, DataTypes, Association, Sequelize } from "sequelize";

interface UsersAttributes {
  id: string;
  email: string;
  password: string;
  refToken: string;
  refTokenExp: Date;
}

class Users extends Model implements UsersAttributes {
  [x: string]: any;
  public id!: string;
  public email!: string;
  public password!: string;
  public refToken!: string;
  public refTokenExp!: Date;

  // public static associations: { UserInfos: Association<Users, UserInfos> };

  static initModel(sequelize: Sequelize) {
    Users.init(
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },

        email: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: true,
        },
        password: {
          allowNull: false,
          type: DataTypes.STRING(100),
        },
        refToken: {
          type: DataTypes.STRING,
        },
        refTokenExp: {
          type: DataTypes.DATE,
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
      },
      {
        sequelize: sequelize,
        modelName: "Users",
      }
    );
    return Users;
  }

  static associate(db: any) {
    console.log(db.Users);
    console.log(db);

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
      through: "Follows",
      foreignKey: "followerId",
      otherKey: "followingId",
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

export default Users;
