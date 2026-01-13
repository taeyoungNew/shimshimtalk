import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import UserRelationHandler from "../handlers/userRelationHandler";

const userRelationRouter = Router();
const userRelationHandler = new UserRelationHandler();

userRelationRouter.get(
  "/followings",
  authMiddleware,
  userRelationHandler.getFollowings
);

userRelationRouter.get(
  "/friends",
  authMiddleware,
  userRelationHandler.getFriends
);

export default userRelationRouter;
