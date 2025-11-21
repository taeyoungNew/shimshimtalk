import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

export default function initSocket(server: any) {
  const io = new Server(server, {
    cors: {
      origin: `${process.env.FRONT_CORS}`,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("socket on!");

    const userId = socket.handshake.query.userId;

    socket.emit("loginJoinOnlineRoom", () => {
      console.log("로그인성공");
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", userId);
    });
  });

  return io;
}
