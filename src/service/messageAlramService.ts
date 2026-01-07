import logger from "../config/logger";
import { MarkMessageAlramDto } from "../dtos/messageAlramDto";
import MessageAlramsRepository from "../repositories/messageAlarmRepository";
const messageAlramsRepository = new MessageAlramsRepository();
class MessageAlramService {
  public markMessageAlrams = async ({
    chatRoomId,
    userId,
  }: MarkMessageAlramDto) => {
    try {
      logger.info("", {
        layer: "Service",
        className: "MessageAlramService",
        functionName: "markMessageAlrams",
      });
      await messageAlramsRepository.markMessageAlrams({ chatRoomId, userId });
    } catch (error) {
      throw error;
    }
  };
}

export default MessageAlramService;
