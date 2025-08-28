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
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

export interface UpdateProfileData {
  profilePicture?: string;
}
