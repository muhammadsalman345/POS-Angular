import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(r => r.AUTH_ROUTES)
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.routes').then(r => r.DASHBOARD_ROUTES)
      },
    //   {
    //     path: 'products',
    //     loadComponent: () => import('./features/products/pages/product-list/product-list.component').then(c => c.ProductListComponent)
    //   },
    //   {
    //     path: 'settings',
    //     loadComponent: () => import('./features/settings/pages/settings-page/settings-page.component').then(c => c.SettingsPageComponent)
    //   },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  },
  { 
    path: '**', 
    redirectTo: '/dashboard'
  }
];