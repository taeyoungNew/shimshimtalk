import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { isLogoutMiddleware } from "../middlewares/isLogout.middleware";
import { optionalAuthMiddleware } from "../middlewares/optional.auth.middleware";
import PostHandler from "../handlers/postHandler";

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
  "/user-posts",
  optionalAuthMiddleware,
  // isLogoutMiddleware,
  // authMiddleware,
  postHandler.getUserPosts
);

// 모든 게시물을 조회
postRouter.get("/", optionalAuthMiddleware, postHandler.getAllPosts);

// 한 게시물만 조회
postRouter.get("/detail", optionalAuthMiddleware, postHandler.getPost);

// 게시물 삭제
postRouter.delete(
  "/:postId",
  isLogoutMiddleware,
  authMiddleware,
  postHandler.deletePost
);

export default postRouter;
