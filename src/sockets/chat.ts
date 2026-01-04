import { Socket } from "socket.io";

export const joinChatRoom = async (socket: Socket, chatRoomId: string) => {
  socket.join(chatRoomId);
};
