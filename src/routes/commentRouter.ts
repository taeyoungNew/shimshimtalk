import { Router } from "express";
import CommentHandler from "../handlers/commentHandler";
import { authMiddleware } from "../middlewares/auth.middleware";
import { isLogoutMiddleware } from "../middlewares/isLogout.middleware";

const commentRouter = Router();
const commentHandler = new CommentHandler();

// 댓글작성
commentRouter.post(
  "/:postId",
  isLogoutMiddleware,
  authMiddleware,
  commentHandler.createComent
);

// 댓글수정
commentRouter.put(
  "/:commentId",
  isLogoutMiddleware,
  authMiddleware,
  commentHandler.modifyComment
);
// 댓글삭제
commentRouter.delete(
  "/:commentId",
  isLogoutMiddleware,
  authMiddleware,
  commentHandler.deleteComment
);

// 하나의 댓글조회
commentRouter.get("/:commentId", commentHandler.getComment);

export default commentRouter;
