import PostLikeService from "../service/postLikeService";
import logger from "../config/logger";
import { postCache } from "../common/cacheLocal/postCache";
import { Request, Response, NextFunction } from "express";
import { userPostsCache } from "../common/cacheLocal/userPostsCache";

class PostLikeHandler {
  private postLikeService = new PostLikeService();
  // 게시물 좋아요
  public postLike = async (
    req: Request<{ postId: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("", {
        method: "post",
        url: "api/post-like/:postId",
        layer: "Handlers",
        className: "PostLikeHandler",
        functionName: "postLike",
      });

      const userId = res.locals.userInfo.userId;
      const postId = Number(req.params.postId);
      const payment = {
        userId,
        postId,
      };
      await this.postLikeService.postLike(payment);
      const post = await postCache.get(`post:${postId}`);
      const userPost = await userPostsCache.get(`post:${postId}`);
      // 캐싱된 게시물데이터의 좋아요갯수를 갱신
      if (post) {
        const postParse = await JSON.parse(post);
        postParse.likeCnt = postParse.likeCnt + 1;
        await postCache.set(`post:${postId}`, JSON.stringify(postParse));
      }

      if (userPost) {
        const userPostParse = await JSON.parse(userPost);
        userPostParse.likeCnt = userPostParse.likeCnt + 1;
        await userPostsCache.set(
          `post:${postId}`,
          JSON.stringify(userPostParse)
        );
      }

      return res
        .status(200)
        .json({ message: "해당 게시물에 좋아요를 눌렀습니다." });
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
      logger.info("", {
        method: "delete",
        url: "api/post-like/:postId",
        layer: "Handlers",
        className: "PostLikeHandler",
        functionName: "postLikeCancel",
      });
      const userId = res.locals.userInfo.userId;
      const postId = Number(req.params.postId);
      const payment = {
        userId,
        postId,
      };
      await this.postLikeService.postLikeCancel(payment);
      const post = await postCache.get(`post:${postId}`);
      const userPost = await userPostsCache.get(`post:${postId}`);

      if (post) {
        const postParse = await JSON.parse(post);
        postParse.likeCnt = postParse.likeCnt - 1;
        await postCache.set(`post:${postId}`, JSON.stringify(postParse));
      }
      if (userPost) {
        const userPostParse = await JSON.parse(userPost);
        userPostParse.likeCnt = userPostParse.likeCnt - 1;
        await userPostsCache.set(
          `post:${postId}`,
          JSON.stringify(userPostParse)
        );
      }

      return res
        .status(200)
        .send({ message: "해당 게시물에 좋아요를 취소했습니다." });
    } catch (e) {
      next(e);
    }
  };
}

export default PostLikeHandler;
