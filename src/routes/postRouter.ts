import { Router } from "express";
import PostHandler from "../handlers/postHandler";
import { authMiddleware } from "../middlewares/auth.middleware";

const postRouter = Router();
const postHandler = new PostHandler();

// 게시물작성
// authenticate가 필요
postRouter.post("/create_post", authMiddleware, postHandler.writePost);

// 게시물 수정

// 유저의 게시물들을 조회
postRouter.get("/user_posts", authMiddleware, postHandler.getUserPosts);

// 모든 게시물을 조회
postRouter.get("/posts", postHandler.getAllPosts);

// 한 게시물만 조회

// 게시물 삭제
postRouter.delete("/delete_post", authMiddleware, postHandler.deletePost);

export default postRouter;
