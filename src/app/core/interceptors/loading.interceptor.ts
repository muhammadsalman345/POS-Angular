import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private activeRequests = 0;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.activeRequests++;

    // You can implement a loading service here
    // For now, we'll just track requests

    return next.handle(req).pipe(
      finalize(() => {
        this.activeRequests--;
        // Hide loading when all requests are complete
        if (this.activeRequests === 0) {
          // Loading complete
        }
      })
    );
  }
}