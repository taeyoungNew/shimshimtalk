import { Response, Request, RequestHandler } from "express";
import { WritePostDto } from "../dtos/posts/writePostDto";
import { postTitleExp, postContentExp } from "../common/validators/postExp";
import PostService from "../service/postService";
import { deflate } from "zlib";
class PostHandler {
  postService = new PostService();
  public writePost: RequestHandler = async (
    req: Request<{}, {}, WritePostDto, {}>,
    res: Response,
    next
  ) => {
    try {
      // const { title, content } = req.body;
      // // const userId: string = req.params.id;
      // // title형식체크
      // if (!postTitleExp(title)) throw Error("게시물제목 형식에 맞지않습니다. ");
      // // content형식체크
      // if (!postContentExp(content))
      //   throw Error("게시물내용 형식에 맞지않습니다. ");
      // const postPayment: WritePostDto = {
      //   title,
      //   content,
      // };
      // await this.postService.writePost(postPayment);
    } catch (error) {
      throw error;
    }
  };
}

export default PostHandler;
