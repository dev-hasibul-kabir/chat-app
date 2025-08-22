import authController from "../controllers/auth.controller";
import authorizedRoute from "../middlewares/auth.middleware";

const authRoutes = require("express").Router();

authRoutes.post("/login", authController.login);
authRoutes.post("/register", authController.register);
authRoutes.post("/logout", authController.logout);
authRoutes.patch("/profile", authorizedRoute, authController.updateProfile);

export default authRoutes;
