import { Router } from "express";
import ChatHandler from "../handlers/chatHandler";
import { authMiddleware } from "../middlewares/auth.middleware";

const chatRouter = Router();
const chatHandler = new ChatHandler();

// 채팅방만들기
chatRouter.post("/create-chatroom", authMiddleware, chatHandler.createChatRoom);

export default chatRouter;
