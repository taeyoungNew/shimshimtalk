import { PostEntity } from "../entity/postsEntity/postEntity";
import Posts from "../database/models/posts";
class PostRepository {
  // Post 작성
  public createPost = async (userId: string, postInfo: PostEntity) => {
    await Posts.create({
      userId,
      title: postInfo.title,
      content: postInfo.content,
    });
  };
  // Post 수정
  public modifyPost = async (userId: string, postInfo: PostEntity) => {
    await Posts.update(
      {
        title: postInfo.title,
        content: postInfo.content,
      },
      {
        where: {
          userId,
        },
      }
    );
  };
  // user의 Post 불러오기
  public getPost = async (userId: string) => {
    const result = await Posts.findAll({ where: { userId }, limit: 10 });
    return result;
  };
  // Post 모두 불러오기
  public getAllPost = async () => {
    const result = await Posts.findAll({ limit: 10 });
    return result;
  };
  // Post 삭제
  public deletePost = async (postId: number) => {
    await Posts.destroy({ where: { id: postId } });
  };
}

export default PostRepository;
