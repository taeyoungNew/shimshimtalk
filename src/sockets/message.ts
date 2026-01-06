import { Server, Socket } from "socket.io";
import MessageRepository from "../repositories/messageRepository";
interface EmitSendMessage {
  chatRoomId: string;
  originalName: string;
  targetUserId: string;
  content: string;
  contentType: "TEXT" | "FILE" | "SYSTEM" | "IMAGE";
}
export const getChatHistory = async (socket: Socket, chatRoomId: string) => {
  const messageRepo = new MessageRepository();
  const messages = await messageRepo.getMessagesByRoom({ chatRoomId });

  socket?.emit("chatHistory", {
    chatRoomId,
    messages,
  });
};

export const emitSendMessage = async (
  io: Server,
  socket: Socket,
  props: EmitSendMessage
) => {
  const messageRepo = new MessageRepository();
  const { chatRoomId, content, originalName, contentType } = props;

  const userId = socket.data.userId;
  // const receiverId
  const result = await messageRepo.saveMessageByRoom({
    chatRoomId,
    senderId: userId,
    originalName,
    content,
    contentType,
  });

  io.to(chatRoomId).emit("receiveMessage", {
    chatRoomId,
    senderId: userId,
    originalName,
    content,
    contentType,
  });
  return result;
};
