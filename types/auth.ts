// /types/auth.ts
// types/auth.ts
export interface User {
  // Required fields
  ID: string;
  name: string;
  email: string;
  role: string;
  token: string;
  createdAt: string;
  
  // Optional fields
  deletedAt?: string | null;
  updatedAt?: string;
  lastLogin?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  status: string;
  status_code: number;
  message: string;
  data: User;
  token?: string;
  user?: User;
  error?: string;
}

export interface Profile {
  profile_id: string;
  full_name: string;  // Changed from Full_name to full_name
  username: string;
  phone: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  email?: string;
}

export interface UpdateProfileData {
  Full_name?: string;
  Phone?: string;
}