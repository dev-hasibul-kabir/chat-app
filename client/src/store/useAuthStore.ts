import { create } from "zustand";
import type {
  AuthStore,
  LoginCredentials,
  RegisterData,
  UpdateProfileData,
} from "../utils/types/auth";
import userService from "../utils/api/api-services/userService";
import axios from "axios";

const initialStatus = {
  login: { loading: false, error: null },
  register: { loading: false, error: null },
  fetchProfile: { loading: false, error: null },
  updateProfile: { loading: false, error: null },
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  requestStatus: initialStatus,

  login: async (credential: LoginCredentials) => {
    try {
      set((state) => ({
        requestStatus: {
          ...state.requestStatus,
          ["login"]: { loading: true, error: null },
        },
      }));
      const res = await userService.login(credential);

      const profile = await userService.getProfile();

      set((state) => ({
        user: profile.data,
        requestStatus: {
          ...state.requestStatus,
          ["login"]: { loading: true, error: null },
        },
      }));

      return { success: true, message: res.data.message };
    } catch (error) {
      let errorMsg = "Login failed";
      if (axios.isAxiosError(error)) {
        errorMsg = error.response?.data?.message || error.message || errorMsg;
      }

      set((state) => ({
        requestStatus: {
          ...state.requestStatus,
          ["login"]: { loading: true, error: null },
        },
      }));
      return { success: false, message: errorMsg };
    }
  },

  register: async (data: RegisterData) => {
    try {
      set((state) => ({
        requestStatus: {
          ...state.requestStatus,
          ["register"]: { loading: true, error: null },
        },
      }));
      const res = await userService.register(data);

      const profile = await userService.getProfile();

      set((state) => ({
        user: profile.data,
        requestStatus: {
          ...state.requestStatus,
          ["register"]: { loading: false, error: null },
        },
      }));

      return {
        success: true,
        message: res.data.message || "Registration successful",
      };
    } catch (error) {
      let errorMsg = "Registration failed";
      if (axios.isAxiosError(error)) {
        errorMsg = error.response?.data?.message || error.message || errorMsg;
      }

      set((state) => ({
        requestStatus: {
          ...state.requestStatus,
          ["register"]: { loading: false, error: errorMsg },
        },
      }));
      return { success: false, message: errorMsg };
    }
  },

  logout: async () => {
    try {
      await userService.logout();
    } finally {
      set({ user: null });
    }
  },

  fetchProfile: async () => {
    try {
      set((state) => ({
        requestStatus: {
          ...state.requestStatus,
          ["fetchProfile"]: { loading: true, error: null },
        },
      }));
      const res = await userService.getProfile();

      set((state) => ({
        user: res.data,
        requestStatus: {
          ...state.requestStatus,
          ["fetchProfile"]: { loading: false, error: null },
        },
      }));

      return { success: true };
    } catch (error) {
      let errorMsg = "Failed to fetch profile!";
      if (axios.isAxiosError(error)) {
        errorMsg = error.response?.data?.message || error.message || errorMsg;
      }
      set((state) => ({
        requestStatus: {
          ...state.requestStatus,
          ["fetchProfile"]: { loading: false, error: errorMsg },
        },
      }));
      return { success: false, message: errorMsg };
    }
  },

  updateProfile: async (data: UpdateProfileData) => {
    try {
      set((state) => ({
        requestStatus: {
          ...state.requestStatus,
          ["updateProfile"]: { loading: true, error: null },
        },
      }));
      const res = await userService.updateProfile(data);
      set((state) => ({
        user: res.data,
        requestStatus: {
          ...state.requestStatus,
          ["updateProfile"]: { loading: false, error: null },
        },
      }));
      return { success: true, message: "Profile Updated!" };
    } catch (error) {
      let errorMsg = "Failed to update profile!";
      if (axios.isAxiosError(error)) {
        errorMsg = error.response?.data?.message || error.message || errorMsg;
      }
      set((state) => ({
        requestStatus: {
          ...state.requestStatus,
          ["updateProfile"]: { loading: false, error: errorMsg },
        },
      }));
      return { success: false, message: errorMsg };
    }
  },
}));
