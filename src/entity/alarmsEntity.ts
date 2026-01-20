export interface SaveAlarmEntity {
  id: number;
  senderId: string;
  senderNickname: string;
  receiverId: string;
  targetId: number | string;
  targetType: "USER" | "POST" | "COMMENT" | "SYSTEM";
  alarmType: "FOLLOW" | "LIKE" | "COMMENT" | "SYSTEM";
  isRead: boolean;
  createdAt: string;
}

export interface ReadAlarmEntity {
  alarmId: number;
  userId: string;
}
