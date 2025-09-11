import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

export const app = express();

export const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_CORS_ORIGIN,
    credentials: true,
  },
});

const userSockets: Record<string, string> = {};

io.on("connection", (socket) => {
  const { userId } = socket.handshake.query;

  if (userId) userSockets[userId as string] = socket.id;

  io.emit("onlineUsers", Object.keys(userSockets));

  socket.on("disconnect", () => {
    delete userSockets[userId as string];
    io.emit("onlineUsers", Object.keys(userSockets));
  });
});

export const getSocketIdByUserId = (userId: string) => {
  return userSockets[userId];
};
