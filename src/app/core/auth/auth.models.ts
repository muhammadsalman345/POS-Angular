import { UserRole } from '../enums/user-role.enum';
import { User } from '../models/user.model';

export interface LoginRequest {
  email?: string;
  phone?: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  user: User;
}
