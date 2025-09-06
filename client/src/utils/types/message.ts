export interface messagePayload {
  text?: string;
  image?: File;
}

export interface Message {
  sender?: any;
  recipient?: any;
  text?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
}

export interface MessageUser {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

type RequestKey = "getUsers" | "getMessages" | "sendMessage";
interface AsyncState {
  loading: boolean;
  error: string | null;
}
export interface MessageStore {
  users: MessageUser[];
  activeChat: Message[];
  requestStatus: Record<RequestKey, AsyncState>;

  getUsers: () => Promise<{ success: boolean; message?: string }>;
  getMessages: (
    partnerId: string
  ) => Promise<{ success: boolean; message?: string }>;
  sendMessage: (
    partnerId: string,
    data: messagePayload
  ) => Promise<{ success: boolean; message?: string }>;
}
