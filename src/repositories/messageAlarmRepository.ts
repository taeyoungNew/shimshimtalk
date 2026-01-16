import { QueryTypes } from "sequelize";
import logger from "../config/logger";
import db from "../database/models/index";
import {
  MarkMessagealarmEntity,
  SaveMsgAlarmEntity,
} from "../entity/messageAlarmEntity";

const { MessageAlarms } = db;

class MessageAlarmsRepository {
  public saveAlarm = async ({
    chatRoomId,
    messageId,
    userId,
  }: SaveMsgAlarmEntity) => {
    try {
      logger.info("", {
        layer: "Repository",
        className: "MessageAlarmsRepository",
        functionName: "saveAlarm",
      });
      return await MessageAlarms.create({
        userId,
        chatRoomId,
        messageId,
      });
    } catch (error) {
      throw error;
    }
  };

  public findAlarmById = async (userId: string, alarmId: string) => {
    logger.info("", {
      layer: "Repository",
      className: "MessagealarmRepository",
      functionName: "findAlarmById",
    });
    return await db.sequelize.query(
      `
      SELECT msg_alarm.id, 
             msg.chatRoomId,
             msg.senderId,
             user_info.nickname AS senderNickname,
             msg.content,
             msg.contentType,
             msg.id AS messageId,
             msg_alarm.createdAt
        FROM MessageAlarms AS msg_alarm
        JOIN Messages AS msg
          ON msg.id = msg_alarm.messageId
        JOIN Users AS users
          ON users.id = msg.senderId
        JOIN UserInfos AS user_info
          ON users.id = user_info.userId
        WHERE msg_alarm.userId = :userId
          AND msg_alarm.isRead = 0
          AND msg_alarm.id = :alarmId
      
      `,
      {
        replacements: { userId, alarmId },
        type: QueryTypes.SELECT,
      }
    );
  };

  public findUnreadByUser = async (userId: string) => {
    logger.info("", {
      layer: "Repository",
      className: "MessagealarmRepository",
      functionName: "findUnreadByUser",
    });
    return await db.sequelize.query(
      `SELECT msg_alarm.id, 
             msg.chatRoomId,
             msg.senderId,
             user_info.nickname AS senderNickname,
             msg.content,
             msg.contentType,
             msg.id AS messageId,
             msg_alarm.createdAt
        FROM MessageAlarms AS msg_alarm
        JOIN Messages AS msg
          ON msg.id = msg_alarm.messageId
        JOIN Users AS users
          ON users.id = msg.senderId
        JOIN UserInfos AS user_info
          ON users.id = user_info.userId
        WHERE msg_alarm.userId = :userId
          AND msg_alarm.isRead = 0
        ORDER BY msg_alarm.createdAt ASC`,
      {
        replacements: { userId },
        type: QueryTypes.SELECT,
      }
    );
  };

  public markMessageAlarms = async ({
    chatRoomId,
    userId,
  }: MarkMessagealarmEntity) => {
    try {
      logger.info("", {
        layer: "Repository",
        className: "MessageAlarmsRepository",
        functionName: "markMessagealarms",
      });
      await MessageAlarms.update(
        { isRead: true },
        {
          where: {
            userId,
            chatRoomId,
            isRead: false,
          },
        }
      );
    } catch (error) {
      throw error;
    }
  };
}

export default MessageAlarmsRepository;
