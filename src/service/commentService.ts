import CommentRepository from "../repositories/commentRepository";
import {
  CreateCommentDto,
  DeleteCommentDto,
  GetCommentDto,
  IsUserCommentDto,
  ModifyCommentDto,
} from "../dtos/comments/commentDto";
class CommentService {
  private commentRepository = new CommentRepository();
  // 댓글작성
  public createComment = async (params: CreateCommentDto) => {
    try {
      await this.commentRepository.createComment(params);
    } catch (error) {
      throw error;
    }
  };
  // 댓글수정
  public modifyComment = async (params: ModifyCommentDto) => {
    try {
      // 자신의 댓글인지 확인
      await this.isUserComment(params);
      await this.commentRepository.modifyComment(params);
    } catch (error) {
      throw error;
    }
  };

  // 하나의 댓글불러오기
  public getComment = async (params: GetCommentDto) => {
    try {
      return await this.commentRepository.getComment(params);
    } catch (error) {
      throw error;
    }
  };

  // 댓글삭제
  public deleteComment = async (params: DeleteCommentDto) => {
    try {
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
      const comment = await this.commentRepository.getComment(params);

      console.log("comment.userId = ", comment.userId);
      console.log("params.userId = ", params.userId);

      if (comment.userId !== params.userId)
        throw new Error("자신의 댓글이 아닙니다.");
    } catch (error) {
      throw error;
    }
  };
}

export default CommentService;
