import { Response, Request, RequestHandler, NextFunction } from "express";
import CommentService from "../service/commentService";
import {
  CreateCommentDto,
  DeleteCommentDto,
  GetCommentDto,
  ModifyCommentDto,
} from "../dtos/commentDto";
import { commentContentExp } from "../common/validators/commentExp";
import userRedisClient from "../common/cache/userIdCache";
import logger from "../config/logger";

/**
 * Comment handler
 */
class CommentHandler {
  private commentService = new CommentService();
  // 댓글작성
  public createComent = async (
    req: Request<{ postId: string }, {}, CreateCommentDto, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("", {
        method: "post",
        url: "api/comment/:postId",
        layer: "Handlers",
        className: "CommentHandler",
        functionName: "createComent",
      });

      // 유저의 id가져오기
      const userId = res.locals.userInfo.userId;
      const postId = req.params.postId;
      if (!commentContentExp(req.body.content))
        throw Error("200자내로 적어주세요.");
      // 댓글의 형식검사
      const payment: CreateCommentDto = {
        userId,
        postId: Number(postId),
        content: req.body.content,
        userNickname: await userRedisClient.get("userNickname"),
      };

      await this.commentService.createComment(payment);
      res.status(200).json({ message: "댓글이 작성되었습니다. " });
    } catch (e) {
      next(e);
    }
  };
  // 댓글수정
  public modifyComment = async (
    req: Request<{ commentId: string }, {}, ModifyCommentDto, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("", {
        method: "put",
        url: "api/comment/:commentId",
        layer: "Handlers",
        className: "CommentHandler",
        functionName: "modifyComment",
      });
      const userId = res.locals.userInfo.userId;
      const commentId = req.params.commentId;

      if (commentContentExp(req.body.newContent))
        throw Error("200자내로 적어주세요.");

      const payment: ModifyCommentDto = {
        userId,
        commentId: Number(commentId),
        newContent: req.body.newContent,
      };

      await this.commentService.modifyComment(payment);

      res.status(200).json({ message: "해당 댓글이 수정되었습니다." });
    } catch (e) {
      next(e);
    }
  };

  // 하나의 댓글불러오기
  public getComment = async (
    req: Request<{ commentId: number }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("", {
        method: "get",
        url: "api/comment/:commentId",
        layer: "Handlers",
        className: "CommentHandler",
        functionName: "getComment",
      });
      const commentId = req.params.commentId;
      const payment: GetCommentDto = {
        commentId,
      };
      const result = await this.commentService.getComment(payment);
      return res.status(200).json({ data: result });
    } catch (e) {
      next(e);
    }
  };

  // 댓글삭제하기
  public deleteComment = async (
    req: Request<{ commentId: string }, {}, DeleteCommentDto>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("", {
        method: "delete",
        url: "api/comment/:commentId",
        layer: "Handlers",
        className: "CommentHandler",
        functionName: "deleteComment",
      });
      const userId = res.locals.userInfo.userId;
      const commentId = req.params.commentId;
      const payment: DeleteCommentDto = {
        userId,
        commentId: Number(commentId),
      };
      await this.commentService.deleteComment(payment);
      res.status(200).json({ message: "해당 댓글이 삭제되었습니다." });
    } catch (e) {
      next(e);
    }
  };
}

export default CommentHandler;
