import { Server, Socket } from "socket.io";
import verifyAccToken from "../middlewares/common/varifyAccToken";
import { log } from "console";
import MessageRepository from "../repositories/messageRepository";

export const joinChatRoom = async (socket: Socket, chatRoomId: string) => {
  socket.join(chatRoomId);
};
