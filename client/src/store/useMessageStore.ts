import { create } from "zustand";
import axios from "axios";
import messageService from "../utils/api/api-services/messageService";
import type { MessageStore } from "../utils/types/message";

const initialStatus = {
  getUsers: { loading: false, error: null },
  getMessages: { loading: false, error: null },
  sendMessage: { loading: false, error: null },
};
export const useMessageStore = create<MessageStore>((set) => ({
  users: [],
  activeChat: [],
  requestStatus: initialStatus,

  getUsers: async () => {
    try {
      set((state) => ({
        requestStatus: {
          ...state.requestStatus,
          getUsers: { loading: true, error: null },
        },
      }));

      const res = await messageService.getUsers();

      set((state) => ({
        users: res.data,
        requestStatus: {
          ...state.requestStatus,
          getUsers: { loading: false, error: null },
        },
      }));

      return { success: true };
    } catch (error) {
      let errorMsg = "Failed to load users!";
      if (axios.isAxiosError(error)) {
        errorMsg = error.response?.data?.message || error.message || errorMsg;
      }
      set((state) => ({
        requestStatus: {
          ...state.requestStatus,
          getUsers: { loading: false, error: errorMsg },
        },
      }));
      return { success: false, message: errorMsg };
    }
  },

  getMessages: async (partnerId) => {
    try {
      set((state) => ({
        requestStatus: {
          ...state.requestStatus,
          getMessages: { loading: true, error: null },
        },
      }));

      const res = await messageService.getMesssages(partnerId);

      set((state) => ({
        activeChat: res.data,
        requestStatus: {
          ...state.requestStatus,
          getMessages: { loading: false, error: null },
        },
      }));

      return { success: true };
    } catch (error) {
      let errorMsg = "Failed to load messages!";
      if (axios.isAxiosError(error)) {
        errorMsg = error.response?.data?.message || error.message || errorMsg;
      }
      set((state) => ({
        requestStatus: {
          ...state.requestStatus,
          getMessages: { loading: false, error: errorMsg },
        },
      }));
      return { success: false, message: errorMsg };
    }
  },

  sendMessage: async (partnerId, data) => {
    try {
      set((state) => ({
        requestStatus: {
          ...state.requestStatus,
          sendMessage: { loading: true, error: null },
        },
      }));

      const res = await messageService.sendMessage(partnerId, data);

      set((state) => ({
        activeChat: [...state.activeChat, res.data],
        requestStatus: {
          ...state.requestStatus,
          sendMessage: { loading: false, error: null },
        },
      }));

      return { success: true, message: "Message sent!" };
    } catch (error) {
      let errorMsg = "Failed to send message!";
      if (axios.isAxiosError(error)) {
        errorMsg = error.response?.data?.message || error.message || errorMsg;
      }
      set((state) => ({
        requestStatus: {
          ...state.requestStatus,
          sendMessage: { loading: false, error: errorMsg },
        },
      }));
      return { success: false, message: errorMsg };
    }
  },
}));
