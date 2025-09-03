import type { messagePayload } from "../../types/message";
import api from "../axios.config";

const messageService = {
  getUsers: () => api.get("/message/users"),
  getChatPartner: (partner_id: string) => api.get(`/message/${partner_id}`),
  sendMessage: (partner_id: string, data: messagePayload) =>
    api.post(`/message/${partner_id}`, data),
};

export default messageService;
