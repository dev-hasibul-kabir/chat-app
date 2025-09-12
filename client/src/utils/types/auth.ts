export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateProfileData {
  profilePicture?: File;
}

type RequestKey = "login" | "register" | "fetchProfile" | "updateProfile";
interface AsyncState {
  loading: boolean;
  error: string | null;
}

import type * as SocketIOClient from "socket.io-client";
export interface AuthStore {
  user: UserProfile | null;
  socket: SocketIOClient.Socket | null;
  onlineUsers: string[] | null;
  requestStatus: Record<RequestKey, AsyncState>;

  login: (
    credential: LoginCredentials
  ) => Promise<{ success: boolean; message: string }>;
  register: (
    data: RegisterData
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  fetchProfile: () => Promise<{ success: boolean }>;
  updateProfile: (
    data: UpdateProfileData
  ) => Promise<{ success: boolean; message: string }>;
  connectSocket: () => void;
  disconnectSocket: () => void;
}
