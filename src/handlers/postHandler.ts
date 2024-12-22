import { Response, Request, RequestHandler } from "express";
import { WritePostDto } from "../dtos/posts/writePostDto";
import { postTitleExp, postContentExp } from "../common/validators/postExp";
import PostService from "../service/postService";
import { deflate } from "zlib";
class PostHandler {
  postService = new PostService();
  // 게시물 작성
  public writePost: RequestHandler = async (
    req: Request<{}, {}, WritePostDto, {}>,
    res: Response,
    next
  ) => {
    try {
      console.log(res.locals);

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
      res.status(200).json({ message: "인증이 완료" });
    } catch (error) {
      throw error;
    }
  };

  // 게시물 모두 조회

  // 게시물 조회

  // 게시물 수정

  // 게시물 삭제
}

export default PostHandler;
