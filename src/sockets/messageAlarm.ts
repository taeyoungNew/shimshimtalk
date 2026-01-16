import { Server, Socket } from "socket.io";
import MessagealarmsRepository from "../repositories/messageAlarmRepository";

interface AddMessagealarm {
  chatRoomId: string;
  senderId: string;
  senderNickname: string;
  content: string;
  contentType: string;
  messageId: number;
  createdAt: string;
}

export const saveMessagealarm = async (
  socket: Socket,
  chatRoomId: string,
  userId: string,
  messageId: string
) => {
  const messageAlarmRepository = new MessagealarmsRepository();

  const result = await messageAlarmRepository.saveAlarm({
    chatRoomId,
    userId,
    messageId,
  });
  console.log(result);
  const alarmId = result.id;
  const receiverId = userId;

  const alarmData = await messageAlarmRepository.findAlarmById(
    receiverId,
    alarmId
  );

  return alarmData[0];
};

export const sendMessagealarmToMe = async (socket: Socket, userId: string) => {
  const messageAlarmRepository = new MessagealarmsRepository();
  const getalarms = await messageAlarmRepository.findUnreadByUser(userId);

  socket.emit("emitalarms", { getalarms });
};

export const notifyMessageAlarm = async (
  io: Server,
  socketId: string,
  payload: AddMessagealarm
) => {
  io.to(socketId).emit("notifyMessageAlarm", payload);
};

export const readalarms = async (
  io: Server,
  chatRoomId: string,
  socketId: string
) => {
  io.to(socketId).emit("alarmsRead", { chatRoomId });
};
