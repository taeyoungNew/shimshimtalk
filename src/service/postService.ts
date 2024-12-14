import PostRepository from "../repositories/postsRepository";
import { WritePostDto } from "../dtos/posts/writePostDto";
class PostService {
  postRepository = new PostRepository();

  public createPost = async (userId: string, postInfo: WritePostDto) => {
    await this.postRepository.createPost(userId, postInfo);
  };
}

export default PostService;
