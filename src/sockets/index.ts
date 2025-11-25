import { Server } from "socket.io";
import { socektLogin, socketLogout } from "./auth";
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
    const socketId = socket.handshake.query.userId;

    socket.on("loginJoinOnlineRoom", async (param) => {
      await socektLogin(socket, param.userId);
    });

    socket.on("loginLeaveOnlineRoom", async (param) => {
      await socketLogout(socket, param.userId);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socketId);
    });
  });

  return io;
}
