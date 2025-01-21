import PostLikeService from "../service/postLikeService";
import {
  PostLikeDto,
  PostLikeCancelDto,
  PostLikeCntDto,
} from "../dtos/postLikeDto";
import { Request, Response, NextFunction } from "express";
class PostLikeHandler {
  private postLikeService = new PostLikeService();
  // 게시물 좋아요
  public postLike = async (
    req: Request<{ postId: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = res.locals.userInfo.userId;
      const postId = Number(req.params.postId);
      const payment = {
        userId,
        postId,
      };
      await this.postLikeService.postLike(payment);
      return res
        .status(200)
        .send({ message: "해당 게시물에 좋아요를 눌렀습니다." });
    } catch (e) {
      next(e);
    }
  };

  // 게시물 좋아요 취소
  public postLikeCancel = async (
    req: Request<{ postId: string }, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = res.locals.userInfo.userId;
      const postId = Number(req.params.postId);
      const payment = {
        userId,
        postId,
      };
      await this.postLikeService.postLikeCancel(payment);
      return res
        .status(200)
        .send({ message: "해당 게시물에 좋아요를 취소했습니다." });
    } catch (e) {
      next(e);
    }
  };
}

export default PostLikeHandler;
