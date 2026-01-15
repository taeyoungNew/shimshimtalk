import { Server, Socket } from "socket.io";
import MessageAlramsRepository from "../repositories/messageAlarmRepository";

interface AddMessageAlram {
  chatRoomId: string;
  senderId: string;
  senderNickname: string;
  content: string;
  contentType: string;
  messageId: number;
  createdAt: string;
}

export const saveMessageAlram = async (
  socket: Socket,
  chatRoomId: string,
  userId: string,
  messageId: string
) => {
  const messageAlarmRepository = new MessageAlramsRepository();

  const result = await messageAlarmRepository.saveAlarm({
    chatRoomId,
    userId,
    messageId,
  });
  console.log(result);
  const alramId = result.id;
  const receiverId = userId;

  const alramData = await messageAlarmRepository.findAlarmById(
    receiverId,
    alramId
  );

  return alramData[0];
};

export const sendMessageAlramToMe = async (socket: Socket, userId: string) => {
  const messageAlarmRepository = new MessageAlramsRepository();
  const getAlrams = await messageAlarmRepository.findUnreadByUser(userId);

  socket.emit("emitAlrams", { getAlrams });
};

export const notifyMessageAlarm = async (
  io: Server,
  socketId: string,
  payload: AddMessageAlram
) => {
  io.to(socketId).emit("notifyMessageAlarm", payload);
};

export const readAlrams = async (
  io: Server,
  chatRoomId: string,
  socketId: string
) => {
  io.to(socketId).emit("alramsRead", { chatRoomId });
};
