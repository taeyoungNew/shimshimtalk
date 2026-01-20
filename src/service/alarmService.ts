import logger from "../config/logger";
import { ReadAlarmDto } from "../dtos/alarmsDto";
import AlarmsRepository from "../repositories/alarmRepository";

class AlarmService {
  private alarmsRepository = new AlarmsRepository();
  public readAlarm = async ({ alarmId, userId }: ReadAlarmDto) => {
    try {
      logger.info("", {
        layer: "Service",
        className: "AlarmService",
        functionName: "readAlarm",
      });
      await this.alarmsRepository.readAlarm({ alarmId, userId });
    } catch (error) {
      throw error;
    }
  };

  public getAlarmsByUser = async (userId: string) => {
    try {
      logger.info("", {
        layer: "Service",
        className: "AlarmService",
        functionName: "getAlarmsByUser",
      });
      const result = await this.alarmsRepository.getAlarmsByUser(userId);

      const alarms = result.map((alarm: { isRead: number }) => ({
        ...alarm,
        isRead: alarm.isRead === 1,
      }));
      return alarms;
    } catch (error) {
      throw error;
    }
  };
}

export default AlarmService;
