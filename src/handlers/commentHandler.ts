import { Response, Request, RequestHandler, NextFunction } from "express";
import CommentService from "../service/commentService";
import {
  CreateCommentDto,
  DeleteCommentDto,
  GetCommentDto,
  ModifyCommentDto,
} from "../dtos/commentDto";
import { commentContentExp } from "../common/validators/commentExp";
import { userCache } from "../common/cache/userIdCache";
import logger from "../config/logger";
import { postCache } from "../common/cacheLocal/postCache";

/**
 * Comment handler
 */
class CommentHandler {
  private commentService = new CommentService();
  // 댓글작성
  public createComent = async (
    req: Request<{ postId: string }, {}, { comment: string }, {}>,
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
      const { authorization } = req.cookies;
      const [tokenType, token] = authorization.split(" ");
      const getUserLoginInfo = JSON.parse(
        await userCache.get(`token:${token}`)
      );

      if (!commentContentExp(req.body.comment))
        throw Error("200자내로 적어주세요.");
      // 댓글의 형식검사
      const payment: CreateCommentDto = {
        userId,
        postId: Number(postId),
        content: req.body.comment,
        userNickname: getUserLoginInfo.userNickname,
      };

      const result = await this.commentService.createComment(payment);
      const plainComment = result.get({ plain: true });

      // 레디스의 해당 게시물의 댓글에도 추가
      const post = await postCache.get(`post:${postId}`);

      const postParse = await JSON.parse(post);
      await postParse.Comments.push(plainComment);
      const postListTTL = await postCache.ttl("posts:list");

      await postCache.set(`post:${postId}`, JSON.stringify(postParse), {
        expire: postListTTL,
      });

      res
        .status(200)
        .json({ message: "댓글이 작성되었습니다. ", plainComment });
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
      const postId = req.body.postId;
      if (!commentContentExp(req.body.comment))
        throw Error("200자내로 적어주세요.");

      const payment: ModifyCommentDto = {
        userId,
        postId: req.body.postId,
        commentId: Number(commentId),
        comment: req.body.comment,
      };

      await this.commentService.modifyComment(payment);

      const post = await postCache.get(`post:${postId}`);
      const postParse = await JSON.parse(post);
      const postTtl = await postCache.ttl(`post:${postId}`);
      let returnComment;
      for (let idx = 0; idx < postParse.Comments.length; idx++) {
        if (postParse.Comments[idx].id === Number(commentId)) {
          postParse.Comments[idx].content = req.body.comment;
          returnComment = postParse.Comments[idx];
          break;
        }
      }

      await postCache.set(`post:${postId}`, JSON.stringify(postParse), {
        EX: postTtl,
      });

      res.status(200).json({
        message: "해당 댓글이 수정되었습니다.",
        data: {
          comment: returnComment,
        },
      });
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
