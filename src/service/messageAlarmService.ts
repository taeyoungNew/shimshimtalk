import logger from "../config/logger";
import { MarkMessageAlarmDto } from "../dtos/messageAlarmDto";
import MessageAlarmsRepository from "../repositories/messageAlarmRepository";
const messagealarmsRepository = new MessageAlarmsRepository();
class messageAlarmService {
  public markMessageAlarms = async ({
    chatRoomId,
    userId,
  }: MarkMessageAlarmDto) => {
    try {
      logger.info("", {
        layer: "Service",
        className: "messageAlarmService",
        functionName: "markMessageAlarms",
      });
      await messagealarmsRepository.markMessageAlarms({ chatRoomId, userId });
    } catch (error) {
      throw error;
    }
  };
}

export default messageAlarmService;
