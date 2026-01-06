import logger from "../config/logger";
import db from "../database/models/index";
import { SaveAlarmEntity } from "../entity/messageAlarmEntity";

const { MessageAlarms } = db;

class MessageAlramsRepository {
  public saveAlarm = async ({
    chatRoomId,
    messageId,
    userId,
  }: SaveAlarmEntity) => {
    try {
      logger.info("", {
        layer: "Repository",
        className: "MessageAlramsRepository",
        functionName: "saveAlarm",
      });
      await MessageAlarms.create({
        userId,
        chatRoomId,
        messageId,
      });
    } catch (error) {
      throw error;
    }
  };
}

export default MessageAlramsRepository;
