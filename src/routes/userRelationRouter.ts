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

export default userRelationRouter;
