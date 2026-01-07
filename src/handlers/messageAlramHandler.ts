import { Response, Request, RequestHandler, NextFunction } from "express";
import logger from "../config/logger";
import MessageAlramService from "../service/messageAlramService";

const messageAlramService = new MessageAlramService();

class MessageAlramHandler {
  public markMessageAlrams = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("", {
        method: "post",
        url: "api/message-alram/mark-message-alram",
        layer: "Handlers",
        className: "FollowHandler",
        functionName: "following",
      });
      const userId = res.locals.userInfo.userId;
      const chatRoomId = req.body.chatRoomId;
      await messageAlramService.markMessageAlrams({ chatRoomId, userId });
      return res.status(200).json({ chatRoomId });
    } catch (error) {
      next(error);
    }
  };
}
export default MessageAlramHandler;
