import { UserRole } from '../enums/user-role.enum';

export interface SidebarMenuItem {
  label: string;
  icon: string;
  route: string;
  roles: UserRole[];
}

export const SIDEBAR_MENU: SidebarMenuItem[] = [
  { label: 'Dashboard', icon: 'dashboard', route: '/dashboard', roles: [UserRole.ADMIN, UserRole.SHOPKEEPER] },
  { label: 'Users', icon: 'groups', route: '/users', roles: [UserRole.ADMIN] },
  { label: 'Shops', icon: 'store', route: '/shops', roles: [UserRole.ADMIN, UserRole.SHOPKEEPER] },
  { label: 'Sellers', icon: 'badge', route: '/sellers', roles: [UserRole.SHOPKEEPER] },
  { label: 'Products', icon: 'smartphone', route: '/products', roles: [UserRole.ADMIN, UserRole.SHOPKEEPER] },
  { label: 'Purchases', icon: 'receipt_long', route: '/purchases', roles: [UserRole.SHOPKEEPER] },
  { label: 'Inventory', icon: 'inventory_2', route: '/inventory', roles: [UserRole.SHOPKEEPER] },
  { label: 'Customers', icon: 'person', route: '/customers', roles: [UserRole.SHOPKEEPER] },
  { label: 'Sales', icon: 'point_of_sale', route: '/sales', roles: [UserRole.ADMIN, UserRole.SHOPKEEPER] },
  { label: 'Expenses', icon: 'payments', route: '/expenses', roles: [UserRole.SHOPKEEPER] },
  { label: 'Reports', icon: 'analytics', route: '/reports', roles: [UserRole.ADMIN, UserRole.SHOPKEEPER] },
  { label: 'Marketplace', icon: 'shopping_bag', route: '/marketplace/products', roles: [UserRole.CUSTOMER, UserRole.ADMIN, UserRole.SHOPKEEPER] }
];
