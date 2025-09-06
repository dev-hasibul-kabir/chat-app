import type { messagePayload } from "../../types/message";
import api from "../axios.config";

const messageService = {
  getUsers: () => api.get("/message/users"),
  getMesssages: (partner_id: string) => api.get(`/message/users/${partner_id}`),
  sendMessage: (partner_id: string, data: messagePayload) =>
    api.post(`/message/users/${partner_id}`, data),
};

export default messageService;
