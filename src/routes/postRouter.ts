import { Router } from "express";
import PostHandler from "../handlers/postHandler";
import { authMiddleware } from "../middlewares/auth.middleware";

const postRouter = Router();
const postHandler = new PostHandler();

// 게시물작성
// authenticate가 필요
postRouter.post("/write_post", authMiddleware, postHandler.writePost);

export default postRouter;
