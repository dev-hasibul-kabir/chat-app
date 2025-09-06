import { Router } from "express";
import authorizedRoute from "../middlewares/auth.middleware";
import messageController from "../controllers/message.controller";

const messageRoutes = Router();

messageRoutes.get("/users", authorizedRoute, messageController.getUsers);
messageRoutes.get(
  "/users/:userId",
  authorizedRoute,
  messageController.getMessages
);
messageRoutes.post(
  "/users/:userId",
  authorizedRoute,
  messageController.createMessage
);

export default messageRoutes;
