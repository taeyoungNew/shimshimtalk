import { Router } from "express";
import SuggestedUserHandler from "../handlers/suggestedUserHandler";
import { authMiddleware } from "../middlewares/auth.middleware";

const suggestedUserRouter = Router();
const suggestedUserHandler = new SuggestedUserHandler();

suggestedUserRouter.get(
  "/",
  authMiddleware,
  suggestedUserHandler.getSuggestedUsers,
);

export default suggestedUserRouter;
