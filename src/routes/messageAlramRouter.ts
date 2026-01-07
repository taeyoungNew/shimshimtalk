import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import MessageAlramHandler from "../handlers/messageAlramHandler";

const messageAlramRouter = Router();
const messageAlramHandler = new MessageAlramHandler();

messageAlramRouter.put(
  "/mark-message-alrams",
  authMiddleware,
  messageAlramHandler.markMessageAlrams
);

export default messageAlramRouter;
