"use strict";

import { Model, DataTypes, Sequelize } from "sequelize";

interface PostsAttributes {
  userId: string;
  title: string;
  content: string;
}

class Posts extends Model implements PostsAttributes {
  [x: string]: any;
  id: number;
  public userId!: string;
  public title!: string;
  public content!: string;

  static initModel(sequelize: Sequelize) {
    Posts.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.NUMBER,
        },
        userId: {
          allowNull: false,
          type: DataTypes.UUID,
        },
        content: { allowNull: false, type: DataTypes.STRING },
      },
      {
        sequelize: sequelize,
        modelName: "Posts",
      }
    );
    return Posts;
  }

  static associate(db: any) {
    // user - post
    Posts.belongsTo(db.Users, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      targetKey: "id",
      foreignKeyConstraint: true,
      onUpdate: "cascade",
      onDelete: "cascade",
    });

    Posts.hasMany(db.Comments, {
      foreignKey: "postId",
      sourceKey: "id",
      hooks: true,
      onUpdate: "cascade",
      onDelete: "cascade",
    });

    Posts.hasMany(db.PostLikes, {
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

export default Posts;
