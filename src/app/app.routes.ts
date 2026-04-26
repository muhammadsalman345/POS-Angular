import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './core/layouts/dashboard-layout/dashboard-layout.component';
import { PublicMarketplaceLayoutComponent } from './core/layouts/public-marketplace-layout/public-marketplace-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { roleGuard } from './core/guards/role.guard';
import { UserRole } from './core/enums/user-role.enum';
import { ResourceKind } from './core/services/resource.service';

export const routes: Routes = [
  {
    path: '',
    component: PublicMarketplaceLayoutComponent,
    children: [
      { path: '', redirectTo: 'marketplace', pathMatch: 'full' },
      { path: 'marketplace', loadComponent: () => import('./features/marketplace/home/marketplace-home.component').then((c) => c.MarketplaceHomeComponent) },
      { path: 'marketplace/shops', data: { kind: 'marketplace-shops' satisfies ResourceKind }, loadComponent: () => import('./features/common/resource-list/resource-list.component').then((c) => c.ResourceListComponent) },
      { path: 'marketplace/shops/:id', data: { kind: 'marketplace-shops' satisfies ResourceKind }, loadComponent: () => import('./features/common/resource-detail/resource-detail.component').then((c) => c.ResourceDetailComponent) },
      { path: 'marketplace/products', loadComponent: () => import('./features/marketplace/product-list/marketplace-product-list.component').then((c) => c.MarketplaceProductListComponent) },
      { path: 'marketplace/products/:id', loadComponent: () => import('./features/marketplace/product-detail/marketplace-product-detail.component').then((c) => c.MarketplaceProductDetailComponent) }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivateChild: [guestGuard],
    children: [
      { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then((c) => c.LoginComponent) },
      { path: 'register', loadComponent: () => import('./features/auth/register/register.component').then((c) => c.RegisterComponent) }
    ]
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivateChild: [authGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then((c) => c.DashboardComponent) },
      { path: 'profile', loadComponent: () => import('./features/auth/profile/profile.component').then((c) => c.ProfileComponent) },
      { path: 'change-password', loadComponent: () => import('./features/auth/change-password/change-password.component').then((c) => c.ChangePasswordComponent) },
      ...crudRoutes('shops', 'shops'),
      ...crudRoutes('sellers', 'sellers'),
      ...crudRoutes('products', 'products'),
      ...crudRoutes('purchases', 'purchases'),
      ...crudRoutes('inventory', 'inventory', false),
      ...crudRoutes('customers', 'customers'),
      ...crudRoutes('sales', 'sales'),
      ...crudRoutes('expenses', 'expenses'),
      ...crudRoutes('reports', 'reports', false),
      { path: 'reports/dashboard-report', data: { kind: 'reports' satisfies ResourceKind }, loadComponent: () => import('./features/common/resource-list/resource-list.component').then((c) => c.ResourceListComponent) },
      { path: 'reports/profit-loss', data: { kind: 'reports' satisfies ResourceKind }, loadComponent: () => import('./features/common/resource-list/resource-list.component').then((c) => c.ResourceListComponent) },
      { path: 'reports/stock-value', data: { kind: 'reports' satisfies ResourceKind }, loadComponent: () => import('./features/common/resource-list/resource-list.component').then((c) => c.ResourceListComponent) },
      { path: 'reports/sales-report', data: { kind: 'sales' satisfies ResourceKind }, loadComponent: () => import('./features/common/resource-list/resource-list.component').then((c) => c.ResourceListComponent) },
      { path: 'sales/:id/invoice', loadComponent: () => import('./features/documents/invoice-page.component').then((c) => c.InvoicePageComponent) },
      { path: 'purchases/:id/receipt', loadComponent: () => import('./features/documents/receipt-page.component').then((c) => c.ReceiptPageComponent) },
      { path: 'users', canActivate: [roleGuard], data: { roles: [UserRole.ADMIN], kind: 'users' satisfies ResourceKind }, loadComponent: () => import('./features/common/resource-list/resource-list.component').then((c) => c.ResourceListComponent) },
      { path: 'users/:id', canActivate: [roleGuard], data: { roles: [UserRole.ADMIN], kind: 'users' satisfies ResourceKind }, loadComponent: () => import('./features/common/resource-detail/resource-detail.component').then((c) => c.ResourceDetailComponent) },
      { path: 'access-denied', loadComponent: () => import('./features/system/access-denied/access-denied.component').then((c) => c.AccessDeniedComponent) },
      { path: 'not-found', loadComponent: () => import('./features/system/not-found/not-found.component').then((c) => c.NotFoundComponent) }
    ]
  },
  { path: '**', redirectTo: 'not-found' }
];

function crudRoutes(path: string, kind: ResourceKind, allowCreate = true): Routes {
  const list = { path, data: { kind }, loadComponent: () => import('./features/common/resource-list/resource-list.component').then((c) => c.ResourceListComponent) };
  const detail = { path: `${path}/:id`, data: { kind }, loadComponent: () => import('./features/common/resource-detail/resource-detail.component').then((c) => c.ResourceDetailComponent) };
  if (!allowCreate) {
    return [list, detail];
  }
  return [
    list,
    { path: `${path}/create`, data: { kind }, loadComponent: () => import('./features/common/resource-form/resource-form.component').then((c) => c.ResourceFormComponent) },
    { path: `${path}/:id/edit`, data: { kind }, loadComponent: () => import('./features/common/resource-form/resource-form.component').then((c) => c.ResourceFormComponent) },
    detail
  ];
}
