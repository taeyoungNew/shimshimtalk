import { Server } from "socket.io";
import { socektLogin, socketLogout } from "./auth";
import { onlineCache } from "../common/cacheLocal/onlineCache";
import dotenv from "dotenv";

dotenv.config();

export default function initSocket(server: any) {
  const onlineUsers = new Map<string, Set<string>>();

  const io = new Server(server, {
    cors: {
      origin: `${process.env.FRONT_CORS}`,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    const socketId = socket.handshake.query.userId;

    socket.emit("onlineUsers", [...onlineUsers.keys()]);

    broadcastOnlineUsers();
    socket.on("loginJoinOnlineRoom", async (param) => {
      await socektLogin(socket, param.userId);
      (socket as any).userId = param.userId;
      if (!onlineUsers.has(param.userId)) {
        onlineUsers.set(param.userId, new Set());
      }
      onlineUsers.get(param.userId)!.add(socket.id);
      broadcastOnlineUsers();
    });

    socket.on("loginLeaveOnlineRoom", async (param) => {
      const userId = (socket as any).userId;
      await socketLogout(socket, userId);
      // 로그아웃 처리 후 소켓 제거
      const set = onlineUsers.get(userId);
      if (set) {
        set.delete(socket.id);

        if (set.size === 0) {
          onlineUsers.delete(userId);
        }
      }

      broadcastOnlineUsers();
    });

    socket.on("disconnect", () => {
      const userId = (socket as any).userId;
      if (!userId) return;

      setTimeout(() => {
        const set = onlineUsers.get(userId);
        if (set) {
          set.delete(socket.id);
          if (set.size === 0) onlineUsers.delete(userId);
        }

        broadcastOnlineUsers();
      }, 3000); // 3초 정도 기다림

      // const set = onlineUsers.get(userId);
      // if (set) {
      //   set.delete(socket.id);
      //   if (set.size === 0) onlineUsers.delete(userId);
      // }

      // broadcastOnlineUsers();
    });
  });

  function broadcastOnlineUsers() {
    const users = [...onlineUsers.keys()];

    io.emit("onlineUsers", users);
  }

  return io;
}
