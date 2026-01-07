import { Socket } from "socket.io";
import MessageAlramsRepository from "../repositories/messageAlarmRepository";

export const saveMessageAlram = async (
  socket: Socket,
  chatRoomId: string,
  userId: string,
  messageId: string
) => {
  const messageAlarmRepository = new MessageAlramsRepository();

  messageAlarmRepository.saveAlarm({ chatRoomId, userId, messageId });
};

export const sendMessageAlram = async (socket: Socket, userId: string) => {
  const messageAlarmRepository = new MessageAlramsRepository();
  const getAlrams = await messageAlarmRepository.findUnreadByUser(userId);

  socket.emit("emitAlrams", { getAlrams });
};
