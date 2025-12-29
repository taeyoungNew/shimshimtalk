import { CreateChatEntity, chatChatRoomEntity } from "../entity/chatEntity";
import db from "../database/models/index";
import logger from "../config/logger";

const { ChatRooms } = db;
class ChatRepository {
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
    console.log("pairKey = ", pairKey);

    return await ChatRooms.findOne({
      attributes: ["id"],

      where: {
        pairKey,
      },
    });
  };
}

export default ChatRepository;
