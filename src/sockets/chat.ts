import { Server, Socket } from "socket.io";
import verifyAccToken from "../middlewares/common/varifyAccToken";
import { log } from "console";
import MessageRepository from "../repositories/messageRepository";

interface EmitSendMessage {
  chatRoomId: string;
  content: string;
  contentType: "TEXT" | "FILE" | "SYSTEM" | "IMAGE";
}

export const joinChatRoom = async (socket: Socket, chatRoomId: string) => {
  const authorization =
    socket.request.headers.cookie.split("authorization=")[1];

  if (!authorization) {
    socket.emit("error", {
      code: "LOGIN_REQUIRED",
      message: "로그인이 필요합니다.",
    });
    return;
  }

  const [, token] = authorization.split("%20");
  const accessToken = verifyAccToken({ token, type: "accToken" });

  if (accessToken === "jwt exired") {
    socket.emit("error", {
      code: "TOKEN_EXPIRED",
      message: "토큰이 만료되었습니다.",
    });
  } else {
    const userId = accessToken.userId;

    socket.data.userId = userId;

    socket.join(chatRoomId);
  }
};

export const emitSendMessage = async (
  io: Server,
  socket: Socket,
  props: EmitSendMessage
) => {
  const messageRepository = new MessageRepository();
  const { chatRoomId, content, contentType } = props;
  const authorization =
    socket.request.headers.cookie.split("authorization=")[1];
  let userId;
  const [, token] = authorization.split("%20");
  const accessToken = verifyAccToken({ token, type: "accToken" });
  if (!authorization || accessToken === "jwt exired") {
    socket.emit("error", {
      code: "LOGIN_REQUIRED",
      message: "로그인이 필요합니다.",
    });
    return;
  } else {
    userId = accessToken.userId;
  }
  messageRepository.saveMessage({
    chatRoomId,
    senderId: userId,
    content,
    contentType,
  });
  io.to(chatRoomId).emit("receiveMessage", {
    chatRoomId,
    senderId: userId,
    content,
    contentType,
  });
};
