import { UserRole } from '../enums/user-role.enum';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
