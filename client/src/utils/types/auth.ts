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
export interface AuthStore {
  user: UserProfile | null;
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
}
