import {
  CreatePostEntity,
  DeletePostEntity,
  GetAllPostEntity,
  GetPostEntity,
  GetUserPostsEntity,
  ModifyPostEntity,
} from "../entity/postEntity";
import Posts from "../database/models/posts";
import Comments from "../database/models/comments";
import logger from "../config/logger";
import { Op } from "sequelize";
import sequelize from "sequelize";

class PostRepository {
  public findPostById = async (postId: GetPostEntity) => {
    logger.info("", {
      layer: "Repository",
      className: "PostRepository",
      functionName: "findPostById",
    });
    const id = postId.postId;
    return await Posts.findByPk(id);
  };

  // Post 작성
  public createPost = async (postInfo: CreatePostEntity) => {
    logger.info("", {
      layer: "Repository",
      className: "PostRepository",
      functionName: "createPost",
    });
    return await Posts.create({
      userId: postInfo.userId,
      title: postInfo.title,
      content: postInfo.content,
    });
  };
  // 한 게시물만 조회
  public getPost = async (params: GetPostEntity) => {
    logger.info("", {
      layer: "Repository",
      className: "PostRepository",
      functionName: "getPost",
    });
    let id;
    if ("object" == typeof params) {
      id = params.postId;
    } else {
      id = params;
    }
    return await Posts.findOne({
      attributes: {
        exclude: ["Posts.id"],
        include: [
          [
            sequelize.literal(`(
              select userinfo.nickname
                FROM Users AS users
           LEFT JOIN UserInfos AS userinfo
                  ON users.id = userinfo.userId
               WHERE users.id = Posts.userId
            )`),
            "userNickname",
          ],
          [
            sequelize.literal(`(
              SELECT COUNT(*)
                FROM PostLikes AS postLike
               WHERE postLike.postId = Posts.id
            )`),
            "likeCnt",
          ],
        ],
      },
      include: {
        model: Comments,
        attributes: ["id", "postId", "userId", "content", "createdAt"],
      },
      where: { id },
    });
  };

  // Post 수정
  public modifyPost = async (postInfo: ModifyPostEntity) => {
    logger.info("", {
      layer: "Repository",
      className: "PostRepository",
      functionName: "modifyPost",
    });
    await Posts.update(
      {
        title: postInfo.title,
        content: postInfo.content,
      },
      {
        where: {
          userId: postInfo.userId,
          id: postInfo.postId,
        },
      }
    );
  };
  // user의 Post 불러오기
  public getUserPosts = async (param: GetUserPostsEntity) => {
    logger.info("", {
      layer: "Repository",
      className: "PostRepository",
      functionName: "getUserPosts",
    });
    let where = {};
    param.postLastId != null
      ? (where = {
          id: {
            [Op.lt]: param.postLastId,
          },
          userId: param.userId,
        })
      : (where = {
          userId: param.userId,
        });
    return await Posts.findAll({
      attributes: {
        exclude: ["Posts.id"],
        include: [
          [
            sequelize.literal(`(
              select userinfo.nickname
                FROM Users AS users
           LEFT JOIN UserInfos AS userinfo
                  ON users.id = userinfo.userId
               WHERE users.id = Posts.userId
            )`),
            "userNickname",
          ],
          [
            sequelize.literal(`(
              SELECT COUNT(*)
                FROM PostLikes AS postLike
               WHERE postLike.postId = Posts.id
            )`),
            "likeCnt",
          ],
        ],
      },
      include: {
        model: Comments,
        attributes: ["id", "postId", "userId", "content", "createdAt"],
      },
      group: ["Posts.id"],
      where,
      limit: 10,
      order: [["createdAt", "desc"]],
    });
  };
  // Post 모두 불러오기
  public getAllPosts = async () => {
    logger.info("", {
      layer: "Repository",
      className: "PostRepository",
      functionName: "getAllPosts",
    });
    return await Posts.findAll({
      attributes: {
        exclude: ["Posts.id"],
        include: [
          [
            sequelize.literal(`(
              select userinfo.nickname
                FROM Users AS users
           LEFT JOIN UserInfos AS userinfo
                  ON users.id = userinfo.userId
               WHERE users.id = Posts.userId
            )`),
            "userNickname",
          ],
          [
            sequelize.literal(`(
              SELECT COUNT(*)
                FROM PostLikes AS postLike
               WHERE postLike.postId = Posts.id
            )`),
            "likeCnt",
          ],
          [
            sequelize.literal(`(
              SELECT COUNT(*)
                FROM Comments AS comments
               WHERE comments.postId = Posts.id
              )`),
            "commentCnt",
          ],
        ],
      },
      include: [
        {
          model: Comments,
          attributes: ["id", "userId", "userNickname", "content"],
        },
      ],
      group: ["Posts.id", "Comments.id"],
      order: [["createdAt", "desc"]],
      subQuery: false,
    });
  };
  // Post 삭제
  public deletePost = async (param: DeletePostEntity) => {
    logger.info("", {
      layer: "Repository",
      className: "PostRepository",
      functionName: "deletePost",
    });
    await Posts.destroy({ where: { id: param.postId, userId: param.userId } });
  };

  // 게시물 존재유무확인
  public existPost = async (params: GetPostEntity) => {
    let id;
    if ("object" == typeof params) {
      id = params.postId;
    } else {
      id = params;
    }
    logger.info("", {
      layer: "Repository",
      className: "PostRepository",
      functionName: "existPost",
    });

    return await Posts.findOne({
      where: {
        id,
      },
    });
  };
}

export default PostRepository;
