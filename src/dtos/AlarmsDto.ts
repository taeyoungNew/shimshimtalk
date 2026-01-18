export interface SaveAlarmDto {
  senderId: string;
  receiverId: string;
  targetId: number | string;
  targetType: "USER" | "POST" | "COMMENT" | "SYSTEM";
  alarmType: "FOLLOW" | "LIKE" | "COMMENT" | "SYSTEM";
  isRead: boolean;
}
