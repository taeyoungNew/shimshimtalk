import PostRepository from "../repositories/postsRepository";
import UserService from "./usersService";
import {
  CreatePostDto,
  DeletePostDto,
  GetAllPostDto,
  GetPostDto,
  GetUserPostsDto,
  IsUserPost,
  ModifyPostDto,
} from "../dtos/posts/PostDto";
class PostService {
  postRepository = new PostRepository();
  userService = new UserService();
  // 게시물작성
  public createPost = async (postInfo: CreatePostDto) => {
    try {
      await this.postRepository.createPost(postInfo);
    } catch (error) {
      throw error;
    }
  };
  // 한 게시물만 조회
  public getPost = async (postInfo: GetPostDto) => {
    try {
      // 그 게시물이 있는지 확인
      const result = await this.postRepository.getPost(postInfo);
      if (!result) throw new Error("해당 게시물이 존재하지 않습니다.");
      return result;
    } catch (error) {
      throw error;
    }
  };

  // 유저가 작성한 게시물들만 조회'
  public getUserPosts = async (postInfo: GetUserPostsDto) => {
    try {
      // 해당 유저가 있는지 확인?
      await this.userService.findUserById(postInfo.userId);
      return await this.postRepository.getUserPosts(postInfo);
    } catch (error) {
      throw error;
    }
  };

  // 게시물 수정
  public modifyPost = async (postInfo: ModifyPostDto) => {
    try {
      await this.isUserPost(postInfo);
      await this.postRepository.modifyPost(postInfo);
    } catch (error) {
      throw error;
    }
  };
  // 게시물 모두조회
  public getAllPosts = async (param: GetAllPostDto) => {
    try {
      return await this.postRepository.getAllPosts(param);
    } catch (error) {
      throw error;
    }
  };

  // 게시물 삭제
  public deletePost = async (param: DeletePostDto) => {
    try {
      // 자신의 게시물인지 확인
      await this.isUserPost(param);

      await this.postRepository.deletePost(param);
    } catch (error) {
      throw error;
    }
  };

  // 게시물이 해당유저의 게시물인지 확인하는 모듈
  public isUserPost = async (param: IsUserPost): Promise<void> => {
    try {
      const post = await this.postRepository.getPost(param);
      if (post.userId !== param.userId) {
        throw new Error("자신의 게시물이 아닙니다.");
      }
    } catch (error) {
      throw error;
    }
  };
}

export default PostService;
