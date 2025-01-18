import { Router } from "express";
import FollowHandler from "../handlers/followHandler";
import { authMiddleware } from "../middlewares/auth.middleware";
import { isLogoutMiddleware } from "../middlewares/isLogout.middleware";

const followRouter = Router();
const followHandler = new FollowHandler();

// 팔로잉
followRouter.post(
  "/:followingId",
  isLogoutMiddleware,
  authMiddleware,
  followHandler.following
);
// 팔로잉 끊기
followRouter.delete(
  "/:followingId",
  isLogoutMiddleware,
  authMiddleware,
  followHandler.stopFollowing
);
// 자신이 팔로잉한 유저들조회
followRouter.get(
  "/myfollowins",
  isLogoutMiddleware,
  authMiddleware,
  followHandler.getFollowings
);
// 자신의 팔로워들 조회

followRouter.get(
  "/myfollews",
  isLogoutMiddleware,
  authMiddleware,
  followHandler.getFollowers
);

export default followRouter;
