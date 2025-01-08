import {
  CreatePostEntity,
  DeletePostEntity,
  GetAllPostEntity,
  GetPostEntity,
  GetUserPostsEntity,
} from "../entity/postEntity";
import Posts from "../database/models/posts";
import Comments from "../database/models/comments";
import { and, Op } from "sequelize";

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

  public getPost = async (postInfo: GetPostEntity) => {
    return await Posts.findOne({
      where: {
        id: Number(postInfo),
      },
      include: {
        model: Comments,
        attributes: ["id", "postId", "userId", "content", "createdAt"],
      },
    });
  };

  // Post 수정
  public modifyPost = async (postInfo: CreatePostEntity) => {
    await Posts.update(
      {
        title: postInfo.title,
        content: postInfo.content,
      },
      {
        where: {
          userId: postInfo.userId,
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
      where,
      limit: 10,
      order: [["createdAt", "desc"]],
      include: {
        model: Comments,
        attributes: ["id", "postId", "userId", "content", "createdAt"],
      },
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
      attributes: ["id", "title", "content", "createdAt"],
      include: {
        model: Comments,
        attributes: ["id", "postId", "userId", "content", "createdAt"],
      },
      limit: 10,
      order: [["createdAt", "desc"]],
      where,
    });
  };
  // Post 삭제
  public deletePost = async (param: DeletePostEntity) => {
    console.log("postId = ", param);

    await Posts.destroy({ where: { id: param.postId, userId: param.userId } });
  };
}

export default PostRepository;
