import authController from "../controllers/auth.controller";
import authorizedRoute from "../middlewares/auth.middleware";
import { fileUpload } from "../middlewares/fileUpload.middleware";

const authRoutes = require("express").Router();

authRoutes.post("/login", authController.login);
authRoutes.post("/register", authController.register);
authRoutes.post("/logout", authController.logout);
authRoutes.get("/profile", authorizedRoute, authController.getProfile);
authRoutes.patch(
  "/profile",
  authorizedRoute,
  fileUpload("profilePicture"),
  authController.updateProfile
);

export default authRoutes;
