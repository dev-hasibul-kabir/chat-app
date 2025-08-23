import { Router } from "express";
import authorizedRoute from "../middlewares/auth.middleware";
import messageController from "../controllers/message.controller";

const messageRoutes = Router();

messageRoutes.get("/users", authorizedRoute, messageController.getUsers);

export default messageRoutes;
