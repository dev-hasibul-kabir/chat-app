import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

export const app = express();

export const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_CORS_ORIGIN,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});
