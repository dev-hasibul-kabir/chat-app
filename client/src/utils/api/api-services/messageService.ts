import type { messagePayload } from "../../types/message";
import api, { formDataHeaders } from "../axios.config";

const messageService = {
  getUsers: () => api.get("/users"),
  getActiveChatPartner: (partner_id: string) => api.get(`/users/${partner_id}`),
  getMesssages: (partner_id: string) => api.get(`/message/users/${partner_id}`),
  sendMessage: (partner_id: string, data: messagePayload) =>
    api.post(`/message/users/${partner_id}`, data, formDataHeaders),
};

export default messageService;
