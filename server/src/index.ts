import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db";
import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/message.route";
import { app, server } from "./lib/socket-io";
import path from "path";

dotenv.config();

app.use(
  cors({
    origin: process.env.CLIENT_CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/auth", authRoutes);
app.use("/api", messageRoutes);

/// Server Client build
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

const PORT = Number(process.env.PORT) || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
