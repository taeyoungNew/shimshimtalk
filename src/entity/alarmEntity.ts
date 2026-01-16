export interface SaveAlarmEntity {
  senderId: string;
  receiverId: string;
  targetId: string;
  targetType: "USER" | "POST" | "COMMENT" | "SYSTEM";
  alarmType: "FOLLOW" | "LIKE" | "COMMENT" | "SYSTEM";
  isRead: boolean;
}
