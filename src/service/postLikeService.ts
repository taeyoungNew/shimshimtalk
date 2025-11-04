import {
  PostLikeDto,
  PostLikeCancelDto,
  PostLikeCntDto,
} from "../dtos/postLikeDto";
import PostLikeRepository from "../repositories/postLikeRepository";
import PostService from "./postService";
import logger from "../config/logger";
import { CustomError } from "../errors/customError";
import errorCodes from "../constants/error-codes.json";
class PostLikeService {
  private postLikeRepository = new PostLikeRepository();
  private postService = new PostService();
  // 게시물 좋아요
  public postLike = async (params: PostLikeDto) => {
    try {
      logger.info("", {
        layer: "Service",
        className: "PostLikeService",
        functionName: "postLike",
      });
      await this.postService.existPost(params);
      await this.checkPostLike(params);
      await this.postLikeRepository.postLike(params);
    } catch (error) {
      throw error;
    }
  };
  // 게시물 좋아요 취소
  public postLikeCancel = async (params: PostLikeCancelDto) => {
    try {
      logger.info("", {
        layer: "Service",
        className: "PostLikeService",
        functionName: "postLikeCancel",
      });
      await this.postService.existPost(params);
      await this.checkPostLikeCencle(params);
      await this.postLikeRepository.postLikeCancel(params);
    } catch (error) {
      throw error;
    }
  };
  // 자신의 게시물들이 받은 좋아요 총 갯수
  public postLikeCnt = async (params: PostLikeCntDto) => {
    try {
      logger.info("", {
        layer: "Service",
        className: "PostLikeService",
        functionName: "postLikeCnt",
      });
      const result = await this.postLikeRepository.postLikeCnt(params);
      return result;
    } catch (error) {
      throw error;
    }
  };

  // 게시물을 좋아요 눌렀는지 확인
  public checkPostLike = async (params: PostLikeDto) => {
    try {
      logger.info("", {
        layer: "Service",
        className: "PostLikeService",
        functionName: "checkPostLike",
      });
      const result = await this.postLikeRepository.existPostLike(params);
      if (result) {
        throw new CustomError(
          errorCodes.AUTH.USER_ALREADY_EXISTS.status,
          errorCodes.AUTH.USER_ALREADY_EXISTS.code,
          "이미 좋아요를 누른 게시물입니다."
        );
      }
    } catch (error) {
      throw error;
    }
  };

  // 게시물에 좋아요를 취소한지 체크
  public checkPostLikeCencle = async (params: PostLikeDto) => {
    try {
      logger.info("", {
        layer: "Service",
        className: "PostLikeService",
        functionName: "checkPostLikeCencle",
      });
      const result = await this.postLikeRepository.existPostLike(params);
      if (result) {
        throw new CustomError(
          errorCodes.AUTH.USER_ALREADY_EXISTS.status,
          errorCodes.AUTH.USER_ALREADY_EXISTS.code,
          "이미 좋아요를 취소한 게시물입니다."
        );
      }
      
    } catch (error) {
      throw error;
    }
  };
}

export default PostLikeService;
