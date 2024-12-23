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

// 모든 게시물을 조회

// 한 게시물만 조회

// 게시물 삭제

export default postRouter;
