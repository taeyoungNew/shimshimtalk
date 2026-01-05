import { NextFunction, Request, Response } from "express";
import logger from "../config/logger";
import ChatService from "../service/chatService";
class ChatHandler {
  private chatService = new ChatService();
  public createChatRoom = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("", {
        method: "post",
        url: "api/chat/create-chatroom",
        layer: "Handlers",
        className: "ChatHandler",
        functionName: "createChatRoom",
      });
      const targetUserId = req.body.targetUserId;
      const userId = res.locals.userInfo.userId;

      const result = await this.chatService.createChatRoom({
        userId,
        targetUserId,
      });
      return res
        .status(200)
        .json({ chatRoomId: result.chatRoomId, isNew: result.isNew });
    } catch (e) {
      next(e);
    }
  };
}

export default ChatHandler;
