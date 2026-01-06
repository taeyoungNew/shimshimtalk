import { QueryTypes } from "sequelize";
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

  public findUnreadByUser = async (userId: string) => {
    logger.info("", {
      layer: "Repository",
      className: "MessageAlramRepository",
      functionName: "findUnreadByUser",
    });
    return await db.sequelize.query(
      `SELECT msg_alram.id, 
             msg.chatRoomId,
             msg.senderId,
             user_info.nickname AS senderNickname,
             msg.content,
             msg.contentType,
             msg.id AS messageId,
             msg_alram.createdAt
        FROM MessageAlarms AS msg_alram
        JOIN Messages AS msg
          ON msg.id = msg_alram.messageId
        JOIN Users AS users
          ON users.id = msg.senderId
        JOIN UserInfos AS user_info
          ON users.id = user_info.userId
        WHERE msg_alram.userId = :userId
          AND msg_alram.isRead = 0
        ORDER BY msg_alram.createdAt ASC`,
      {
        replacements: { userId },
        type: QueryTypes.SELECT,
      }
    );
  };
}

export default MessageAlramsRepository;
