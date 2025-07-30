import { Response, Request, RequestHandler, NextFunction } from "express";
import {
  CreatePostDto,
  DeletePostDto,
  GetUserPostsDto,
  ModifyPostDto,
  GetPostDto,
  IsUserPost,
} from "../dtos/PostDto";
import dotenv from "dotenv";
import { postTitleExp, postContentExp } from "../common/validators/postExp";
import PostService from "../service/postService";
import logger from "../config/logger";
import { postCache } from "../common/cacheLocal/postCache";
import Posts from "../database/models/posts";
dotenv.config();
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
      // title형식체크
      if (!postTitleExp(title)) throw Error("게시물제목 형식에 맞지않습니다. ");
      // content형식체크
      if (!postContentExp(content)) throw Error("300자내로 적어주세요. ");
      const postPayment: CreatePostDto = {
        userId,
        title,
        content,
      };

      const newPost = await this.postService.createPost(postPayment);

      // posts:list와 post의 TTL을 조회
      const postListTTL = await postCache.ttl("posts:list");

      await postCache.lPush("posts:list", String(newPost.id));
      await postCache.expire("posts:list", postListTTL);
      await postCache.set(
        `post:${newPost.id}`,
        JSON.stringify({
          id: String(newPost.dataValues.id),
          userId: newPost.dataValues.userId,
          title: newPost.dataValues.title,
          content: newPost.dataValues.content,
          userNickname: newPost.dataValues.userNickname,
          likeCnt: newPost.dataValues.likeCnt,
          commentCnt: newPost.dataValues.commentCnt,
          Comments: newPost.dataValues.Comments,
        }),
        { EX: postListTTL }
      );

      res
        .status(200)
        .json({ message: "게시물이 작성되었습니다.", data: newPost });
    } catch (e) {
      next(e);
    }
  };

  // 게시물 모두조회
  public getAllPosts: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("", {
        method: "get",
        url: "api/post/all_posts",
        layer: "Handlers",
        className: "PostHandler",
        functionName: "getAllPosts",
      });

      const postLastId = Number(req.query.postLastId);

      const ids: [] = await postCache.lRange("posts:list", 0, -1);

      let result: Posts[] = [];

      // 첫랜더링
      if (ids.length === 0) {
        result = await this.postService.getAllPosts();

        await this.cachePosts(result);
        let posts;
        if (result.length != 0) {
          posts = result.splice(0, 5);
          const isLast = posts.length < 5 ? true : false;
          return res.status(200).json({ posts, isLast });
        }
      } else {
        // 두번째랜더링
        const lastPostIdx = ids.findIndex((id) => {
          return Number(id) === Number(postLastId);
        });
        const targetIds = ids.slice(lastPostIdx + 1, lastPostIdx + 6);

        const postJsons = await Promise.all(
          targetIds.map((id: string) => postCache.get(`post:${id}`))
        );

        const posts = postJsons.map((post) => JSON.parse(post));
        const isLast = posts.length < 5 ? true : false;
        return res.status(200).json({ posts, isLast });
      }
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
      const ids: [] = await postCache.lRange("posts:list", 0, -1);

      // 그전에 레디스에 데이터들이 있는지 확인
      if (ids.length === 0) {
        const result = await this.postService.getAllPosts();

        await this.cachePosts(result);
      }
      // 레디스에서 확인

      const checkPostId = ids.find((id) => id === postId);

      let result;
      // 레디스에 해당 게시물이 있으면 반환
      if (checkPostId) {
        const postStr = await postCache.get(`post:${checkPostId}`);

        result = JSON.parse(postStr);
      } else {
        result = await this.postService.getPost(postId);
        postCache.set(`post:list${postId}`);
        postCache.set(
          `post:${result.dataValues.id}`,
          JSON.stringify({
            id: result.dataValues.id,
            userId: result.dataValues.userId,
            title: result.dataValues.title,
            content: result.dataValues.content,
            userNickname: result.dataValues.userNickname,
            likeCnt: result.dataValues.likeCnt,
            commentCnt: result.dataValues.commentCnt,
            Comments: result.dataValues.Comments,
          }),
          { EX: 600 }
        );
      }
      // 레디스에 없으면 DB에서 가져오고 redis에도 저장
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
      // 수정대상게시물의 id
      const postId = Number(req.params.postId);

      // 현재로그인한 유저의 id
      const userId = res.locals.userInfo.userId;
      const { title, content } = req.body;

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

      // DB데이터를 우선으로 수정
      await this.postService.modifyPost(payment);

      // 캐싱정보가져오기
      const post = await postCache.get(`post:${postId}`);
      const postParse = await JSON.parse(post);

      postParse.title = title;
      postParse.content = content;

      await postCache.set(`post:${postId}`, JSON.stringify(postParse));

      res
        .status(200)
        .json({ message: "해당게시물이 수정되었습니다.", data: postParse });
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
    req: Request<{ postId: string }, {}, {}, {}>,
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
      const postId = req.params.postId;
      const postPayment: DeletePostDto = {
        userId,
        postId: Number(postId),
      };

      // 먼저 DB에 있는 게시물데이터삭제
      await this.postService.deletePost(postPayment);
      // 성공시
      // 레디스에 캐싱된 해당게시물의 정보도 삭제하기
      const cacheIds = await postCache.lRange("posts:list", 0, -1);
      const postListTTL = await postCache.ttl("posts:list");

      const ids = await cacheIds.map((el: string) => JSON.parse(el));

      const filterIds = await ids.filter((el: number) => {
        return el.toString() !== postId;
      });
      await postCache.del("posts:list");
      await postCache.del(`post:${postId}`);

      await postCache.rPush(
        "posts:list",
        filterIds.map((el: string) => JSON.stringify(el))
      );

      await postCache.expire("posts:list", postListTTL);

      res.status(200).json({ message: "게시물이 삭제되었습니다." });
    } catch (e) {
      next(e);
    }
  };

  // 게시물데이터를 다시 캐싱하기
  private cachePosts = async (result: Posts[]) => {
    const ids = result.map((el) => el.id);

    await postCache.rPush("posts:list", ids.map(String));
    await postCache.expire("posts:list", 600);

    for (let idx = 0; idx < result.length; idx++) {
      await postCache.set(
        `post:${result[idx].dataValues.id}`,
        JSON.stringify({
          id: result[idx].dataValues.id,
          userId: result[idx].dataValues.userId,
          title: result[idx].dataValues.title,
          content: result[idx].dataValues.content,
          userNickname: result[idx].dataValues.userNickname,
          likeCnt: result[idx].dataValues.likeCnt,
          commentCnt: result[idx].dataValues.commentCnt,
          Comments: result[idx].dataValues.Comments,
        }),
        { EX: 600 }
      );
    }
  };
}

export default PostHandler;
