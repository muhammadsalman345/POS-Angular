import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { APP_ROUTES } from '../constants/app-routes.constant';
import { UserRole } from '../enums/user-role.enum';
import { AuthService } from '../auth/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const roles = (route.data['roles'] ?? []) as UserRole[];
  const auth = inject(AuthService);
  const router = inject(Router);
  return roles.length === 0 || auth.hasAnyRole(roles) ? true : router.parseUrl(APP_ROUTES.ACCESS_DENIED);
};
