import { CreateChatEntity, chatChatRoomEntity } from "../entity/chatEntity";
import db from "../database/models/index";
import logger from "../config/logger";
import { QueryTypes } from "sequelize";

const { ChatRooms } = db;
class ChatRepository {
  public getChats = async (userId: string) => {
    logger.info("", {
      layer: "Repository",
      className: "ChatRepository",
      functionName: "getChats",
    });

    const query = `
      SELECT chatrooms.id AS chatRoomId,
             users.id AS targetUserId,
             users.email AS targetUserEmail,
             userInfos.nickname AS targetUserNickname,
             messages.content AS lastMessagePreview,
             messages.contentType AS lastMessageType,
             messages.createdAt AS lastMessageAt
        FROM simsim_talk.chatrooms chatrooms
        JOIN simsim_talk.users users
          ON users.id = 
        CASE WHEN chatrooms.userAId = :userId
        THEN chatrooms.userBId 
        ELSE chatrooms.userAId
         END
        JOIN simsim_talk.userinfos userinfos
          ON userinfos.userId = users.id
        LEFT JOIN simsim_talk.messages messages
          ON messages.id = (
          SELECT messages2.id
                FROM simsim_talk.messages messages2
          WHERE messages2.chatRoomId = chatRooms.id
          ORDER BY messages.createdAt DESC
          LIMIT 1
          )
      WHERE chatrooms.userAId = :userId
          OR chatrooms.userBId = :userId;
    `;
    return await db.sequelize.query(query, {
      replacements: { userId },
      type: QueryTypes.SELECT,
    });
  };
  public createChatRoom = async ({
    userId,
    targetUserId,
    pairKey,
  }: CreateChatEntity) => {
    logger.info("", {
      layer: "Repository",
      className: "ChatRepository",
      functionName: "createChatRoom",
    });

    return await ChatRooms.create({
      userAId: userId,
      userBId: targetUserId,
      pairKey: pairKey,
    });
  };

  public checkChatRoom = async ({ pairKey }: chatChatRoomEntity) => {
    logger.info("", {
      layer: "Repository",
      className: "ChatRepository",
      functionName: "createChatRoom",
    });

    return await ChatRooms.findOne({
      attributes: ["id"],

      where: {
        pairKey,
      },
    });
  };
}

export default ChatRepository;
