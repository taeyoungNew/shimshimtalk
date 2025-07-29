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
} from "../dtos/PostDto";
import logger from "../config/logger";
class PostService {
  postRepository = new PostRepository();
  userService = new UserService();
  // 게시물작성
  public createPost = async (postInfo: CreatePostDto) => {
    try {
      logger.info("", {
        layer: "Service",
        className: "PostService",
        functionName: "createPost",
      });
      const newPost = await this.postRepository.createPost(postInfo);
      const newPostId: GetPostDto = {
        postId: newPost.id,
      };
      return await this.getPost(newPostId);
    } catch (error) {
      throw error;
    }
  };
  // 한 게시물만 조회
  public getPost = async (postInfo: GetPostDto) => {
    try {
      logger.info("", {
        layer: "Service",
        className: "PostService",
        functionName: "getPost",
      });

      // 그 게시물이 있는지 확인
      await this.existPost(postInfo);
      const result = await this.postRepository.getPost(postInfo);
      return result;
    } catch (error) {
      throw error;
    }
  };

  // 유저가 작성한 게시물들만 조회'
  public getUserPosts = async (postInfo: GetUserPostsDto) => {
    try {
      logger.info("", {
        layer: "Service",
        className: "PostService",
        functionName: "getUserPosts",
      });
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
      logger.info("", {
        layer: "Service",
        className: "PostService",
        functionName: "modifyPost",
      });
      // 그 게시물이 있는지 확인
      await this.existPost(postInfo);
      await this.isUserPost(postInfo);
      await this.postRepository.modifyPost(postInfo);
    } catch (error) {
      throw error;
    }
  };
  // 게시물 모두조회
  public getAllPosts = async () => {
    try {
      logger.info("", {
        layer: "Service",
        className: "PostService",
        functionName: "getAllPosts",
      });
      return await this.postRepository.getAllPosts();
    } catch (error) {
      throw error;
    }
  };

  // 게시물 삭제
  public deletePost = async (param: DeletePostDto) => {
    try {
      logger.info("", {
        layer: "Service",
        className: "PostService",
        functionName: "deletePost",
      });
      // 그 게시물이 있는지 확인
      await this.existPost(param);
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
      logger.info("", {
        layer: "Service",
        className: "PostService",
        functionName: "isUserPost",
      });
      const post = await this.postRepository.getPost(param);

      if (post.userId !== param.userId) {
        throw new Error("자신의 게시물이 아닙니다.");
      }
    } catch (error) {
      throw error;
    }
  };
  // 그 게시물이 있는지 확인
  public existPost = async (param: GetPostDto): Promise<void> => {
    try {
      logger.info("", {
        layer: "Service",
        className: "PostService",
        functionName: "existPost",
      });

      const result = await this.postRepository.existPost(param);
      if (!result) throw new Error("해당 게시물이 존재하지 않습니다.");
    } catch (error) {
      throw error;
    }
  };
}

export default PostService;
