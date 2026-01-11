import logger from "../config/logger";
import { UploadDto } from "../dtos/uploadDto";
import { SaveMessageByRoomEntity } from "../entity/messagesEntity";
import MessageRepository from "../repositories/messageRepository";
import UploadRepository from "../repositories/uploadRepository";

class UploadService {
  uploadRepository = new UploadRepository();

  public uploadImage = async ({
    chatRoomId,
    content,
    senderId,
    type,
  }: UploadDto) => {
    try {
      // logger.info("", {
      //   layer: "Service",
      //   className: "UploadService",
      //   functionName: "uploadImage",
      // });
      // const payload: SaveMessageByRoomEntity = {
      //   chatRoomId,
      //   content,
      //   originalName,
      //   contentType: type,
      //   senderId,
      // };
      // return await this.uploadRepository.uploadFileOrImg(payload);
    } catch (error) {
      throw error;
    }
  };
}

export default UploadService;
