import { Response, Request, RequestHandler } from "express";
import { CreatePostDto, GetAllPostDto } from "../dtos/posts/PostDto";
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
  public getPost = async () => {};

  // 게시물 수정
  public modifyPost = async () => {};
  // user의 게시물 조회
  public getUserPosts = async () => {};
  // 게시물 삭제
  public deletePost = () => {};
}

export default PostHandler;
