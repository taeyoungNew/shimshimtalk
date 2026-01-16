import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import MessageAlarmHandler from "../handlers/messageAlarmHandler";

const messageAlarmRouter = Router();
const messageAlarmHandler = new MessageAlarmHandler();

messageAlarmRouter.put(
  "/mark-message-alarms",
  authMiddleware,
  messageAlarmHandler.markMessagealarms
);

export default messageAlarmRouter;
