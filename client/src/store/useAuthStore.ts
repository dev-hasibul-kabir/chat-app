import { create } from "zustand";
import type {
  AuthStore,
  LoginCredentials,
  RegisterData,
} from "../utils/types/auth";
import userService from "../utils/api/api-services/userService";
import axios from "axios";

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (credential: LoginCredentials) => {
    try {
      set({ loading: true, error: null });
      const res = await userService.login(credential);

      const profile = await userService.getProfile();
      set({ user: profile.data, loading: false });

      return { success: true, message: res.data.message };
    } catch (error) {
      let errorMsg = "Login failed";
      if (axios.isAxiosError(error)) {
        errorMsg = error.response?.data?.message || error.message || errorMsg;
      }

      set({ error: errorMsg, loading: false });
      return { success: false, message: errorMsg };
    }
  },

  register: async (data: RegisterData) => {
    try {
      set({ loading: true, error: null });
      const res = await userService.register(data);

      const profile = await userService.getProfile();
      set({ user: profile.data, loading: false });

      return {
        success: true,
        message: res.data.message || "Registration successful",
      };
    } catch (error) {
      let errorMsg = "Registration failed";
      if (axios.isAxiosError(error)) {
        errorMsg = error.response?.data?.message || error.message || errorMsg;
      }

      set({ error: errorMsg, loading: false });
      return { success: false, message: errorMsg };
    }
  },

  logout: async () => {
    try {
      await userService.logout(); // backend clears cookie
    } finally {
      set({ user: null });
    }
  },

  fetchProfile: async () => {
    try {
      set({ loading: true, error: null });
      const res = await userService.getProfile();
      set({ user: res.data, loading: false });
      return { success: true };
    } catch (err) {
      set({ user: null, loading: false });
      return { success: false };
    }
  },
}));
