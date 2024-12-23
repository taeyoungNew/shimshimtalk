import PostRepository from "../repositories/postsRepository";
import UserService from "./usersService";
import {
  CreatePostDto,
  GetPostDto,
  GetUserPostsDto,
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
      return await this.postRepository.getPost(postInfo);
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
  public modifyPost = async () => {
    try {
    } catch (error) {
      throw error;
    }
  };
  // 게시물 모두조회
  public getAllPosts = async () => {
    try {
    } catch (error) {
      throw error;
    }
  };

  // 게시물 삭제
  public deletePost = () => {
    try {
    } catch (error) {
      throw error;
    }
  };
}

export default PostService;
