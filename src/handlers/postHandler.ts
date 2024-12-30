import { Response, Request, RequestHandler, NextFunction } from "express";
import {
  CreatePostDto,
  DeletePostDto,
  GetAllPostDto,
  GetUserPostsDto,
  ModifyPostDto,
  GetPostDto,
} from "../dtos/posts/PostDto";
import { postTitleExp, postContentExp } from "../common/validators/postExp";
import PostService from "../service/postService";
class PostHandler {
  postService = new PostService();
  // 게시물 작성
  public writePost: RequestHandler = async (
    req: Request<{}, {}, CreatePostDto, {}>,
    res: Response,
    next
  ) => {
    try {
      const userId = res.locals.userInfo.userId;

      const { title, content } = req.body;
      // const userId: string = req.params.id;
      // title형식체크
      if (!postTitleExp(title)) throw Error("게시물제목 형식에 맞지않습니다. ");
      // content형식체크
      if (!postContentExp(content))
        throw Error("게시물내용 형식에 맞지않습니다. ");
      const postPayment: CreatePostDto = {
        userId,
        title,
        content,
      };
      await this.postService.createPost(postPayment);
      res.status(200).json({ message: "게시물이 작성되었습니다." });
    } catch (error) {
      throw error;
    }
  };

  // 게시물 모두조회
  public getAllPosts: RequestHandler = async (
    req: Request<{}, {}, GetAllPostDto, {}>,
    res: Response,
    next
  ) => {
    try {
      const postLastId: GetAllPostDto = {
        postLastId: req.body.postLastId,
      };

      const result = await this.postService.getAllPosts(postLastId);
      return res.status(200).json({ data: result });
    } catch (error) {
      throw error;
    }
  };

  // 한 게시물만 조회
  public getPost = async (
    req: Request<{ postId: GetPostDto }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const postId = req.params.postId;
      console.log(":postId = ", typeof postId);

      const result = await this.postService.getPost(postId);
      res.status(200).json({ data: result });
    } catch (error) {
      throw error;
    }
  };

  // 게시물 수정
  public modifyPost: RequestHandler = async (
    req: Request,
    res: Response,
    next
  ) => {
    try {
      const postId: string = req.params.id;
      const userId = res.locals.userInfo.userId;
      const { title, content } = req.body;
      // const userId: string = req.params.id;
      // title형식체크
      if (!postTitleExp(title)) throw Error("게시물제목 형식에 맞지않습니다. ");
      // content형식체크
      if (!postContentExp(content))
        throw Error("게시물내용 형식에 맞지않습니다. ");
      const payment: ModifyPostDto = {
        userId,
        postId: Number(postId),
        title,
        content,
      };
      await this.postService.modifyPost(payment);
      res.status(200).json({ message: "해당게시물이 수정되었습니다." });
    } catch (error) {}
  };

  // user의 게시물 조회
  public getUserPosts: RequestHandler = async (
    req: Request<{}, {}, GetUserPostsDto, {}>,
    res: Response,
    next
  ) => {
    const param = {
      userId: res.locals.userInfo.userId,
      postLastId: req.body.postLastId,
    };
    const result = await this.postService.getUserPosts(param);
    res.status(200).json({ data: result });
  };

  // 게시물 삭제
  public deletePost: RequestHandler = async (
    req: Request<{}, {}, DeletePostDto, {}>,
    res: Response,
    next
  ) => {
    try {
      const userId = res.locals.userInfo.userId;
      const postPayment: DeletePostDto = {
        userId,
        postId: req.body.postId,
      };

      await this.postService.deletePost(postPayment);
      res.status(200).json({ message: "게시물이 삭제되었습니다." });
    } catch (error) {
      throw error;
    }
  };
}

export default PostHandler;
