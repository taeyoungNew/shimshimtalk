import { Server, Socket } from "socket.io";
import { socketLogin, socketLogout } from "./auth";
import { onlineCache } from "../common/cacheLocal/onlineCache";
import dotenv from "dotenv";

dotenv.config();

type OnlineUserData = {
  socketIds: Set<string>; // 현재 로그인된 소켓ID들
  lastPing: number; // 마지막 하트비트 시간
};

export default function initSocket(server: any) {
  const onlineUsers = new Map<string, OnlineUserData>();
  const socketIdToUserId = new Map<string, string>();
  const io = new Server(server, {
    cors: {
      origin: `${process.env.FRONT_CORS}`,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const socketId = socket.id;

    if (!socketId) return;

    broadcastOnlineUsers(socket);

    // 현재 로그인중인 유저정보들을 커넥트한클라이언트에 전달
    socket.on("loginJoinOnlineRoom", async (param) => {
      socketIdToUserId.set(socketId, param.userId);

      await socketLogin(socket, param.userId);
      (socket as any).userId = param.userId;

      if (!onlineUsers.has(param.userId)) {
        // 첫로그인

        onlineUsers.set(param.userId, {
          lastPing: Date.now(),
          socketIds: new Set([socketId]),
        });
      } else {
        // 한유저가 여러탭이나 다른 브라우저 및 기기에서 접속할수있기때문
        const onlineUser = onlineUsers.get(param.userId);
        onlineUser.socketIds.add(socketId);
      }

      broadcastOnlineUsers(socket);
    });

    socket.on("heartbeat", ({ userId }) => {
      const onlineUserInfo = onlineUsers.get(userId);
      if (onlineUserInfo) {
        onlineUserInfo.lastPing = Date.now();
      }
    });

    socket.on("registerOnline", ({ userId }) => {
      // socketIdToUserId에 등록
      socketIdToUserId.set(socket.id, userId);

      // onlineUsers에 등록
      const userInfo = onlineUsers.get(userId);

      if (!userInfo) return;
      userInfo.socketIds.add(socket.id);
      onlineUsers.set(userId, userInfo);

      // 전체 클라이언트에 온라인 유저 목록 브로드캐스트
      broadcastOnlineUsers(socket);
    });

    socket.on("loginLeaveOnlineRoom", async (param) => {
      const userId = param.userId;
      await socketLogout(socket, userId);
      // 로그아웃 처리 후 소켓 제거
      const onlineUserInfo = onlineUsers.get(userId);
      if (onlineUserInfo) {
        onlineUserInfo.socketIds.delete(socketId);
      }

      // 2. Set이 비면 → 유저 전체 오프라인 처리
      if (
        onlineUserInfo?.socketIds !== undefined &&
        onlineUserInfo.socketIds.size === 0
      ) {
        onlineUsers.delete(userId);
      }

      broadcastOnlineUsers(socket);
    });

    socket.on("disconnect", () => {
      const userId = socketIdToUserId.get(socket.id);
      const onlineUserInfo = onlineUsers.get(userId);
      if (!userId) return;
      if (!onlineUserInfo) return;

      setTimeout(() => {
        onlineUserInfo.socketIds.delete(socket.id);
        if (onlineUserInfo.socketIds.size === 0) {
          onlineUsers.delete(userId);
        }
        socketIdToUserId.delete(socket.id);
        broadcastOnlineUsers(socket);
      }, 3000);
    });
  });

  function broadcastOnlineUsers(socket: Socket) {
    const users = [...onlineUsers.keys()];

    io.emit("onlineUsers", users);
  }

  return io;
}
