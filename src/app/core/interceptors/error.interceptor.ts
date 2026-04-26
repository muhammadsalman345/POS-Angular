import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { APP_ROUTES } from '../constants/app-routes.constant';
import { ToastService } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      const message = readableError(error);
      if (error.status === 401) {
        auth.logout();
      } else if (error.status === 403) {
        toast.error('Access denied');
        void router.navigateByUrl(APP_ROUTES.ACCESS_DENIED);
      } else if (error.status === 404) {
        toast.error('Resource not found');
        void router.navigateByUrl(APP_ROUTES.NOT_FOUND);
      } else {
        toast.error(message);
      }
      return throwError(() => error);
    })
  );
};

function readableError(error: HttpErrorResponse): string {
  const serverError = error.error as { message?: string | string[]; errors?: Record<string, string[]> } | null;
  if (Array.isArray(serverError?.message)) {
    return serverError.message.join(', ');
  }
  if (serverError?.message) {
    return serverError.message;
  }
  if (serverError?.errors) {
    return Object.values(serverError.errors).flat().join(', ');
  }
  return error.message || 'Something went wrong';
}
