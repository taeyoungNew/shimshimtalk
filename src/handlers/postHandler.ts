import { Response, Request, RequestHandler, NextFunction } from "express";
import {
  CreatePostDto,
  DeletePostDto,
  GetAllPostDto,
  GetUserPostsDto,
  ModifyPostDto,
  GetPostDto,
  IsUserPost,
} from "../dtos/posts/PostDto";
import { postTitleExp, postContentExp } from "../common/validators/postExp";
import PostService from "../service/postService";
import logger from "../config/logger";

class PostHandler {
  postService = new PostService();
  // 게시물 작성
  public createPost: RequestHandler = async (
    req: Request<{}, {}, CreatePostDto, {}>,
    res: Response,
    next
  ) => {
    try {
      logger.info("", {
        method: "post",
        url: "api/post/",
        layer: "Handlers",
        className: "PostHandler",
        functionName: "createPost",
      });
      const userId = res.locals.userInfo.userId;

      const { title, content } = req.body;
      // const userId: string = req.params.id;
      // title형식체크
      if (!postTitleExp(title)) throw Error("게시물제목 형식에 맞지않습니다. ");
      // content형식체크
      if (!postContentExp(content)) throw Error("300자내로 적어주세요. ");
      const postPayment: CreatePostDto = {
        userId,
        title,
        content,
      };
      await this.postService.createPost(postPayment);
      res.status(200).json({ message: "게시물이 작성되었습니다." });
    } catch (e) {
      next(e);
    }
  };

  // 게시물 모두조회
  public getAllPosts: RequestHandler = async (
    req: Request<{}, {}, GetAllPostDto, {}>,
    res: Response,
    next
  ) => {
    try {
      logger.info("", {
        method: "get",
        url: "api/post/all_posts",
        layer: "Handlers",
        className: "PostHandler",
        functionName: "getAllPosts",
      });
      const postLastId: GetAllPostDto = {
        postLastId: req.body.postLastId,
      };

      const result = await this.postService.getAllPosts(postLastId);
      return res.status(200).json({ data: result });
    } catch (e) {
      next(e);
    }
  };

  // 한 게시물만 조회
  public getPost = async (
    req: Request<{ postId: GetPostDto }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("", {
        method: "get",
        url: "api/post/:postId",
        layer: "Handlers",
        className: "PostHandler",
        functionName: "getPost",
      });
      const postId = req.params.postId;
      console.log(":postId = ", typeof postId);

      const result = await this.postService.getPost(postId);
      res.status(200).json({ data: result });
    } catch (e) {
      next(e);
    }
  };

  // 게시물 수정
  public modifyPost = async (
    req: Request<{ postId: string }, {}, ModifyPostDto>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("", {
        method: "put",
        url: "api/post/:postId",
        layer: "Handlers",
        className: "PostHandler",
        functionName: "modifyPost",
      });
      const postId = Number(req.params.postId);
      console.log(postId);

      const userId = res.locals.userInfo.userId;
      const { title, content } = req.body;
      // const userId: string = req.params.id;
      // title형식체크
      if (!postTitleExp(title)) throw Error("게시물제목 형식에 맞지않습니다. ");
      // content형식체크
      if (!postContentExp(content))
        throw Error("게시물내용 형식에 맞지않습니다. ");
      const modifyPayment: IsUserPost = {
        userId,
        postId,
      };
      await this.postService.isUserPost(modifyPayment);
      const payment: ModifyPostDto = {
        userId,
        postId,
        title,
        content,
      };
      await this.postService.modifyPost(payment);
      res.status(200).json({ message: "해당게시물이 수정되었습니다." });
    } catch (e) {
      next(e);
    }
  };

  // user의 게시물 조회
  public getUserPosts = async (
    req: Request<{ userId: string }, {}, GetUserPostsDto, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("", {
        method: "get",
        url: "api/post/:userId",
        layer: "Handlers",
        className: "PostHandler",
        functionName: "getUserPosts",
      });
      const param = {
        userId: req.params.userId,
        postLastId: req.body.postLastId,
      };
      const result = await this.postService.getUserPosts(param);
      res.status(200).json({ data: result });
    } catch (e) {
      next(e);
    }
  };

  // 게시물 삭제
  public deletePost = async (
    req: Request<{ postId: string }, {}, DeletePostDto, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("", {
        method: "delete",
        url: "api/post/:postId",
        layer: "Handlers",
        className: "PostHandler",
        functionName: "deletePost",
      });
      const userId = res.locals.userInfo.userId;
      const postPayment: DeletePostDto = {
        userId,
        postId: Number(req.params.postId),
      };

      await this.postService.deletePost(postPayment);
      res.status(200).json({ message: "게시물이 삭제되었습니다." });
    } catch (e) {
      next(e);
    }
  };
}

export default PostHandler;
