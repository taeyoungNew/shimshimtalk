import {
  CreatePostEntity,
  GetPostEntity,
  GetUserPostsEntity,
} from "../entity/postsEntity/postEntity";
import Posts from "../database/models/posts";
import Comments from "../database/models/comments";
class PostRepository {
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
        id: postInfo.postId,
      },
      include: {
        model: Comments,
        attributes: ["id", "postId", "userId", "content", "createAt"],
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
  public getUserPosts = async (userId: GetUserPostsEntity) => {
    return await Posts.findAll({
      where: { userId },
      limit: 10,
      order: ["createDate", "desc"],
      include: {
        model: Comments,
        attributes: ["id", "postId", "userId", "content", "createAt"],
      },
    });
  };
  // Post 모두 불러오기
  public getAllPosts = async () => {
    return await Posts.findAll({
      limit: 10,
      order: ["createDate", "desc"],
      include: {
        model: Comments,
        attributes: ["id", "postId", "userId", "content", "createAt"],
      },
    });
  };
  // Post 삭제
  public deletePost = async (postId: number) => {
    await Posts.destroy({ where: { id: postId } });
  };
}

export default PostRepository;
