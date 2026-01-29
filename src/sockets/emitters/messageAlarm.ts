import { Server, Socket } from "socket.io";
import MessagealarmsRepository from "../../repositories/messageAlarmRepository";

interface AddMessagealarm {
  chatRoomId: string;
  senderId: string;
  senderNickname: string;
  content: string;
  contentType: string;
  messageId: number;
  createdAt: string;
}

export const saveMessageAlarm = async (
  socket: Socket,
  chatRoomId: string,
  userId: string,
  messageId: string,
) => {
  const messageAlarmRepository = new MessagealarmsRepository();

  const result = await messageAlarmRepository.saveAlarm({
    chatRoomId,
    userId,
    messageId,
  });
  const alarmId = result.id;
  const receiverId = userId;

  const alarmData = await messageAlarmRepository.findAlarmById(
    receiverId,
    alarmId,
  );

  return alarmData[0];
};

export const sendMessageAlarmToMe = async (socket: Socket, userId: string) => {
  const messageAlarmRepository = new MessagealarmsRepository();
  const getAlarms = await messageAlarmRepository.findUnreadByUser(userId);

  socket.emit("emitAlarms", { getAlarms });
};

export const notifyMessageAlarm = async (
  io: Server,
  socketId: string,
  payload: AddMessagealarm,
) => {
  io.to(socketId).emit("notifyMessageAlarm", payload);
};

export const readMsgAlarms = async (
  io: Server,
  chatRoomId: string,
  socketId: string,
) => {
  io.to(socketId).emit("msgAlarmsRead", { chatRoomId });
};
