import logger from "../config/logger";
import db from "../database/models/index";
import {
  GetMessagesByRoomEntity,
  SaveMessageByRoomEntity,
} from "../entity/messagesEntity";

const { Messages } = db;
class UploadRepository {
  public uploadFileOrImg = async ({
    chatRoomId,
    content,
    contentType,
    senderId,
  }: SaveMessageByRoomEntity) => {
    try {
      logger.info("", {
        layer: "Service",
        className: "PostService",
        functionName: "getIsLikedPostIds",
      });

      return await Messages.create({
        chatRoomId,
        content,
        contentType,
        senderId,
      });
    } catch (error) {
      throw error;
    }
  };
}

export default UploadRepository;
