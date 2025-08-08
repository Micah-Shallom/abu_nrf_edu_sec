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