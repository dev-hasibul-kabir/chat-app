import authController from "../controllers/auth.controller";

const authRoutes = require("express").Router();

authRoutes.post("/login", authController.login);
authRoutes.post("/register", authController.register);
authRoutes.post("/logout", authController.logout);
// authRoutes.get('/profile', authController.getProfile);

export default authRoutes;
