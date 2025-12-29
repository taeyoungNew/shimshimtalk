import db from "../database/models/index";
import logger from "../config/logger";
import { SaveMessageEntity } from "../entity/messageEntity";

const { Messages } = db;
class MessageRepository {
  public saveMessage = async ({
    senderId,
    chatRoomId,
    content,
    contentType,
  }: SaveMessageEntity) => {
    logger.info("", {
      layer: "Repository",
      className: "MessageRepository",
      functionName: "saveMessage",
    });

    return await Messages.create({
      senderId,
      chatRoomId,
      content,
      type: contentType,
    });
  };
}

export default MessageRepository;
