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
import PostLikes from "../database/models/postlikes";
import { and, Op, where } from "sequelize";
import sequelize from "sequelize";

class PostRepository {
  public findPostById = async (postId: GetPostEntity) => {
    const id = postId.postId;
    return await Posts.findByPk(id);
  };

  // Post 작성
  public createPost = async (postInfo: CreatePostEntity) => {
    await Posts.create({
      userId: postInfo.userId,
      title: postInfo.title,
      content: postInfo.content,
    });
  };
  // 한 게시물만 조회

  public getPost = async (params: GetPostEntity) => {
    return await Posts.findOne({
      where: {
        id: params.postId,
      },
      include: {
        model: Comments,
        attributes: ["id", "postId", "userId", "content", "createdAt"],
      },
    });
  };

  // Post 수정
  public modifyPost = async (postInfo: ModifyPostEntity) => {
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
  public getAllPosts = async (param: GetAllPostEntity) => {
    let where = {};
    param.postLastId != null
      ? (where = {
          id: {
            [Op.lt]: param.postLastId,
          },
        })
      : "";

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
      include: [
        {
          model: Comments,
          attributes: ["id", "userId", "userNickname", "content"],
        },
      ],
      group: ["Posts.id", "Comments.id"],
      limit: 10,
      order: [["createdAt", "desc"]],
      subQuery: false,
      where,
    });
  };
  // Post 삭제
  public deletePost = async (param: DeletePostEntity) => {
    await Posts.destroy({ where: { id: param.postId, userId: param.userId } });
  };

  // 게시물 존재유무확인
  public existPost = async (param: number) => {
    return await Posts.findByPk(param);
  };
}

export default PostRepository;
