import CommentRepository from "../repositories/commentRepository";
import {
  CreateCommentDto,
  DeleteCommentDto,
  GetCommentDto,
  IsUserCommentDto,
  ModifyCommentDto,
} from "../dtos/comments/commentDto";
import { GetPostDto } from "../dtos/posts/PostDto";
import PostService from "./postService";
import logger from "../config/logger";
class CommentService {
  private postService = new PostService();
  private commentRepository = new CommentRepository();
  // 댓글작성
  public createComment = async (params: CreateCommentDto) => {
    try {
      logger.info("", {
        layer: "Service",
        className: "CommentService",
        functionName: "createComment",
      });
      // 게시물이 있는지 확인
      await this.postService.existPost(params);
      await this.commentRepository.createComment(params);
    } catch (error) {
      throw error;
    }
  };
  // 댓글수정
  public modifyComment = async (params: ModifyCommentDto) => {
    try {
      logger.info("", {
        layer: "Service",
        className: "CommentService",
        functionName: "modifyComment",
      });
      // 자신의 댓글인지 확인
      await this.isUserComment(params);
      await this.existComment(params);
      await this.commentRepository.modifyComment(params);
    } catch (error) {
      throw error;
    }
  };

  // 하나의 댓글불러오기
  public getComment = async (params: GetCommentDto) => {
    try {
      logger.info("", {
        layer: "Service",
        className: "CommentService",
        functionName: "getComment",
      });
      await this.existComment(params);
      return await this.commentRepository.getComment(params);
    } catch (error) {
      throw error;
    }
  };

  // 댓글삭제
  public deleteComment = async (params: DeleteCommentDto) => {
    try {
      logger.info("", {
        layer: "Service",
        className: "CommentService",
        functionName: "deleteComment",
      });
      await this.existComment(params);
      // 자신의 댓글인지 확인
      await this.isUserComment(params);
      await this.commentRepository.deleteComment(params);
    } catch (error) {
      throw error;
    }
  };

  // 댓글이 해당유저의 댓글인지 확인하는 모듈
  public isUserComment = async (params: IsUserCommentDto) => {
    try {
      logger.info("", {
        layer: "Service",
        className: "CommentService",
        functionName: "isUserComment",
      });
      const comment = await this.commentRepository.getComment(params);

      if (comment.userId !== params.userId)
        throw new Error("자신의 댓글이 아닙니다.");
    } catch (error) {
      throw error;
    }
  };

  // 댓글이 있는지 확인
  public existComment = async (param: GetCommentDto) => {
    try {
      logger.info("", {
        layer: "Service",
        className: "CommentService",
        functionName: "existComment",
      });
      const result = await this.commentRepository.existComment(param);
      if (!result) throw new Error("해당 게시물이 존재하지 않습니다.");
    } catch (error) {
      throw error;
    }
  };
}

export default CommentService;
