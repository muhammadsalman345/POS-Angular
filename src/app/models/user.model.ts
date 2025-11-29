export interface User {
  id: number;
  email: string;
  role: 'admin' | 'user';
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  shops: any[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  expiresIn: number;
}

export interface SignupResponse {
  user: User;
  token: string;
  expiresIn: number;
}