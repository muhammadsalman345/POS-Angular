import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  private authService = inject(AuthService);
  
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  // Public observables
  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();
  public currentUser$ = this.authService.currentUser$;

  async login(credentials: { email: string; password: string }): Promise<boolean> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    try {
      await this.authService.login(credentials).toPromise();
      return true;
    } catch (error: any) {
      this.errorSubject.next(error.message || 'Login failed');
      return false;
    } finally {
      this.loadingSubject.next(false);
    }
  }

  async register(userData: any): Promise<boolean> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    try {
      await this.authService.register(userData).toPromise();
      return true;
    } catch (error: any) {
      this.errorSubject.next(error.message || 'Registration failed');
      return false;
    } finally {
      this.loadingSubject.next(false);
    }
  }

  logout(): void {
    this.authService.logout();
  }

  clearError(): void {
    this.errorSubject.next(null);
  }
}