import db from "../database/models/index";
import logger from "../config/logger";
import {
  GetMessagesByRoomEntity,
  SaveMessageByRoomEntity,
} from "../entity/messagesEntity";
import { where } from "sequelize";

const { Messages } = db;

class MessageRepository {
  public getMessagesByRoom = async ({
    chatRoomId,
  }: GetMessagesByRoomEntity) => {
    console.log("getMessagesByRoom = ", chatRoomId);

    logger.info("", {
      layer: "Repository",
      className: "MessageRepository",
      functionName: "getMessagesByRoom",
    });

    return await Messages.findAll({
      where: { chatRoomId: chatRoomId },
      order: [["createdAt", "ASC"]],
    });
  };
  public saveMessageByRoom = async ({
    chatRoomId,
    content,
    contentType,
    senderId,
  }: SaveMessageByRoomEntity) => {
    logger.info("", {
      layer: "Repository",
      className: "MessageRepository",
      functionName: "saveMessageByRoom",
    });

    await Messages.create({
      chatRoomId,
      content,
      type: contentType,
      senderId,
    });
  };
}

export default MessageRepository;
