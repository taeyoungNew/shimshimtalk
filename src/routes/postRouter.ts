import { Router } from "express";
import PostHandler from "../handlers/postHandler";

const postRouter = Router();
const postHandler = new PostHandler();

// 게시물작성
// authenticate가 필요
postRouter.post("/post/write_post", postHandler.writePost);

export default postRouter;
