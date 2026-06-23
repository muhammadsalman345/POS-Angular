import { UserRole } from '../enums/user-role.enum';

export interface SidebarMenuItem {
  label: string;
  icon: string;
  route: string;
  roles: UserRole[];
}

export const SIDEBAR_MENU: SidebarMenuItem[] = [
  { label: 'Dashboard', icon: 'dashboard', route: '/dashboard', roles: [UserRole.SUPER_ADMIN, UserRole.SELLER] },
  { label: 'Users', icon: 'groups', route: '/users', roles: [UserRole.SUPER_ADMIN] },
  { label: 'Shops', icon: 'store', route: '/shops', roles: [UserRole.SUPER_ADMIN, UserRole.SELLER] },
  { label: 'Sellers', icon: 'badge', route: '/sellers', roles: [UserRole.SELLER] },
  { label: 'Products', icon: 'smartphone', route: '/products', roles: [UserRole.SUPER_ADMIN, UserRole.SELLER] },
  { label: 'Purchases', icon: 'receipt_long', route: '/purchases', roles: [UserRole.SELLER] },
  { label: 'Inventory', icon: 'inventory_2', route: '/inventory', roles: [UserRole.SELLER] },
  { label: 'Customers', icon: 'person', route: '/customers', roles: [UserRole.SELLER] },
  { label: 'Sales', icon: 'point_of_sale', route: '/sales', roles: [UserRole.SUPER_ADMIN, UserRole.SELLER] },
  { label: 'Expenses', icon: 'payments', route: '/expenses', roles: [UserRole.SELLER] },
  { label: 'Reports', icon: 'analytics', route: '/reports', roles: [UserRole.SUPER_ADMIN, UserRole.SELLER] },
  { label: 'Marketplace', icon: 'shopping_bag', route: '/marketplace/products', roles: [UserRole.BUYER, UserRole.SUPER_ADMIN, UserRole.SELLER] }
];
