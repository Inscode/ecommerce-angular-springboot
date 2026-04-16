export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  accountType: string;
  businessName?: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  message: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'RETAIL' | 'WHOLESALE' | 'ADMIN';
}