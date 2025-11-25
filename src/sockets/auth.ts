import { Socket } from "socket.io";

export const socektLogin = async (socket: Socket, userId: string) => {
  await socket.join(`user:${String(userId)}`);
};

export const socketLogout = async (socket: Socket, userId: string) => {
  await socket.leave(`user:${String(userId)}`);
};
