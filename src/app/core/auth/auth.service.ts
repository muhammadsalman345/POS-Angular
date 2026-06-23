import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api-endpoints.constant';
import { APP_ROUTES } from '../constants/app-routes.constant';
import { UserRole } from '../enums/user-role.enum';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';
import { AuthResponse, LoginRequest, RegisterRequest } from './auth.models';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(ApiService);
  private readonly router = inject(Router);
  private readonly tokenService = inject(TokenService);
  private readonly user = signal<User | null>(this.tokenService.getUser());

  readonly currentUser = this.user.asReadonly();
  readonly isAuthenticated = computed(() => Boolean(this.tokenService.getToken()));

  login(payload: LoginRequest): Observable<AuthResponse> {
    return this.api.post<AuthResponse>(API_ENDPOINTS.AUTH_LOGIN, payload).pipe(tap((response) => this.persist(response)));
  }

  register(payload: RegisterRequest): Observable<AuthResponse> {
    return this.api.post<AuthResponse>(API_ENDPOINTS.AUTH_REGISTER, payload).pipe(tap((response) => this.persist(response)));
  }

  loadProfile(): Observable<User> {
    return this.api.get<User>(API_ENDPOINTS.AUTH_PROFILE).pipe(tap((user) => this.setUser(user)));
  }

  logout(): void {
    this.tokenService.clear();
    this.user.set(null);
    void this.router.navigateByUrl(APP_ROUTES.LOGIN);
  }

  hasAnyRole(roles: UserRole[]): boolean {
    const role = this.currentUser()?.role;
    return Boolean(role && roles.includes(role));
  }

  redirectAfterLogin(): void {
    const destination = this.currentUser()?.role === UserRole.BUYER ? `${APP_ROUTES.MARKETPLACE}/products` : APP_ROUTES.DASHBOARD;
    void this.router.navigateByUrl(destination);
  }

  private persist(response: AuthResponse): void {
    this.tokenService.setToken(response.token);
    this.setUser(response.user);
  }

  private setUser(user: User): void {
    this.tokenService.setUser(user);
    this.user.set(user);
  }
}
