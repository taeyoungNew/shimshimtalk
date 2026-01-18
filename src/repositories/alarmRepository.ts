import db from "../database/models/index";
import logger from "../config/logger";
import { SaveAlarmEntity } from "../entity/alarmEntity";

const { Alarms } = db;

class AlarmsRepository {
  public saveAlarm = async ({
    senderId,
    targetId,
    targetType,
    alarmType,
    receiverId,
    isRead,
  }: SaveAlarmEntity) => {
    logger.info("", {
      layer: "Repository",
      className: "AlarmsRepository",
      functionName: "saveAlarm",
    });

    return await Alarms.create({
      senderId,
      receiverId,
      alarmType,
      targetId,
      targetType,
      isRead,
    });
  };
}

export default AlarmsRepository;
