import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  private authService = inject(AuthService);

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles'] as string[];
    const user = this.authService.currentUser$;
    
    if (!expectedRoles || expectedRoles.length === 0) {
      return true;
    }

    // This is a simplified check - you might want to implement proper role checking
    return this.authService.hasRole(expectedRoles[0]);
  }
}