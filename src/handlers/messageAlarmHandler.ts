import { Response, Request, RequestHandler, NextFunction } from "express";
import logger from "../config/logger";
import MessageAlarmService from "../service/messageAlarmService";

const messageAlarmService = new MessageAlarmService();

class messageAlarmHandler {
  public markMessagealarms = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("", {
        method: "post",
        url: "api/message-alarm/mark-message-alarm",
        layer: "Handlers",
        className: "FollowHandler",
        functionName: "following",
      });
      const userId = res.locals.userInfo.userId;
      const chatRoomId = req.body.chatRoomId;
      await messageAlarmService.markMessageAlarms({ chatRoomId, userId });
      return res.status(200).json({ chatRoomId });
    } catch (error) {
      next(error);
    }
  };
}
export default messageAlarmHandler;
