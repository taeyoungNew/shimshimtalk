import { Router } from "express";
import PostLikeHandler from "../handlers/postLikeHandler";
import { authMiddleware } from "../middlewares/auth.middleware";
import { isLogoutMiddleware } from "../middlewares/isLogout.middleware";

const postLikeRouter = Router();
const postLikeHandler = new PostLikeHandler();

postLikeRouter.post(
  "/:postId",
  isLogoutMiddleware,
  authMiddleware,
  postLikeHandler.postLike
);

postLikeRouter.delete(
  "/:postId",
  isLogoutMiddleware,
  authMiddleware,
  postLikeHandler.postLikeCancel
);

export default postLikeRouter;
