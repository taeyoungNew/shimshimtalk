import { Router } from "express";
import PostHandler from "../handlers/postHandler";
import { authMiddleware } from "../middlewares/auth.middleware";
import { isLogoutMiddleware } from "../middlewares/isLogout.middleware";

const postRouter = Router();
const postHandler = new PostHandler();

// 게시물작성
// authenticate가 필요
postRouter.post(
  "/",
  isLogoutMiddleware,
  authMiddleware,
  postHandler.createPost
);

// 게시물 수정
postRouter.put(
  "/:postId",
  isLogoutMiddleware,
  authMiddleware,
  postHandler.modifyPost
);

// 유저의 게시물들을 조회
postRouter.get(
  "/user_posts",
  isLogoutMiddleware,
  authMiddleware,
  postHandler.getUserPosts
);

// 모든 게시물을 조회
postRouter.get("/all_posts", postHandler.getAllPosts);

// 한 게시물만 조회
postRouter.get("/:postId", postHandler.getPost);

// 게시물 삭제
postRouter.delete(
  "/delete_post",
  isLogoutMiddleware,
  authMiddleware,
  postHandler.deletePost
);

export default postRouter;
