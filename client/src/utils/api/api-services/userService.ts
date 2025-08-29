import type {
  LoginCredentials,
  RegisterData,
  UpdateProfileData,
} from "../../types/auth";
import api from "../axios.config";

const userService = {
  login: (credentials: LoginCredentials) =>
    api.post("/auth/login", credentials),
  register: (data: RegisterData) => api.post("/auth/register", data),
  getProfile: () => api.get("/auth/profile"),
  updateProfile: (data: UpdateProfileData) => api.patch("/auth/profile", data),
  logout: () => api.post("/auth/logout"),
};

export default userService;
