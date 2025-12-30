import { Server, Socket } from "socket.io";
import verifyAccToken from "../middlewares/common/varifyAccToken";
import { log } from "console";

interface EmitSendMessage {
  chatRoomId: string;
  content: string;
  contentType: "TEXT" | "FILE" | "SYSTEM" | "IMAGE";
}

export const joinChatRoom = async (socket: Socket, chatRoomId: string) => {
  // const cookie = socket.request.headers.cookie;

  // if (!cookie) {
  //   throw new Error("NO_COOKIE");
  // }
  // const authorization = cookie.split("authorization=")[1]?.split(";")[0];

  // if (!authorization) {
  //   socket.emit("error", {
  //     code: "LOGIN_REQUIRED",
  //     message: "로그인이 필요합니다.",
  //   });
  //   return;
  // }
  // const authorization =
  //   socket.request.headers.cookie.split("authorization=")[1];

  // const [, token] = authorization.split("%20");
  // const accessToken = verifyAccToken({ token, type: "accToken" });
  const isLogin = socket.data.userId;
  if (!isLogin) {
    socket.emit("error", {
      code: "TOKEN_EXPIRED",
      mmessage: "로그인이 필요합니다.",
    });
  } else {
    socket.join(chatRoomId);
  }
};

export const emitSendMessage = async (
  io: Server,
  socket: Socket,
  props: EmitSendMessage
) => {
  const { chatRoomId, content, contentType } = props;
  // const authorization =
  //   socket.request.headers.cookie.split("authorization=")[1];
  // let userId;
  // const [, token] = authorization.split("%20");
  // const accessToken = verifyAccToken({ token, type: "accToken" });

  const senderUserId = socket.data.userId;
  if (!senderUserId) {
    socket.emit("error", {
      code: "LOGIN_REQUIRED",
      message: "로그인이 필요합니다.",
    });
    return;
  }

  io.to(chatRoomId).emit("receiveMessage", {
    chatRoomId,
    senderId: senderUserId,
    content,
    contentType,
  });
};
