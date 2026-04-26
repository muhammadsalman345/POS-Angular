export const API_ENDPOINTS = {
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  AUTH_PROFILE: '/auth/profile',
  AUTH_CHANGE_PASSWORD: '/auth/change-password',
  SHOPS: '/shops',
  MY_SHOPS: '/shops/my',
  SELLERS_BY_SHOP: '/shops/:shopId/sellers',
  PRODUCTS_BY_SHOP: '/shops/:shopId/products',
  PURCHASES_BY_SHOP: '/shops/:shopId/purchases',
  INVENTORY_BY_SHOP: '/shops/:shopId/inventory',
  INVENTORY_SUMMARY: '/shops/:shopId/inventory/summary',
  SALES_BY_SHOP: '/shops/:shopId/sales',
  EXPENSES_BY_SHOP: '/shops/:shopId/expenses',
  CUSTOMERS: '/customers',
  USERS: '/users',
  REPORTS: '/reports',
  MARKETPLACE_PRODUCTS: '/marketplace/products',
  MARKETPLACE_SHOPS: '/marketplace/shops'
} as const;

export function endpoint(path: string, params: Record<string, string | number | null | undefined>): string {
  return Object.entries(params).reduce((nextPath, [key, value]) => {
    return nextPath.replace(`:${key}`, encodeURIComponent(String(value ?? '')));
  }, path);
}
