import { Server } from "socket.io";
let io: Server;

export const initSocketServer = (httpServer: any) => {
  io = new Server(httpServer, {
    cors: {
      origin: `${process.env.FRONT_CORS}`,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  return io;
};

export const getIO = () => io;
