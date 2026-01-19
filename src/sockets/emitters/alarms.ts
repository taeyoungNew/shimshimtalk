import { getIO } from "../socket.server";
import { getSocketIdsByUserId } from "../onlineUsers.service";
import { SaveAlarmDto } from "../../dtos/AlarmsDto";

export const sendAlarmToUser = async (
  userId: string,
  payload: SaveAlarmDto
) => {
  const io = getIO();
  const socketIds = getSocketIdsByUserId(userId);

  socketIds.forEach((socketId) => {
    io.to(socketId).emit("sendAlarm", payload);
  });
};
