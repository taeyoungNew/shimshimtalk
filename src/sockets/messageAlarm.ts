import { Socket } from "socket.io";
import MessageAlramsRepository from "../repositories/messageAlarmRepository";

export const saveMessageAlram = async (
  socket: Socket,
  chatRoomId: string,
  userId: string,
  messageId: string
) => {
  const messageAlarmRepository = new MessageAlramsRepository();
  console.log(chatRoomId, userId, messageId);

  messageAlarmRepository.saveAlarm({ chatRoomId, userId, messageId });
};
