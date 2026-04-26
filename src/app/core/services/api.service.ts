import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export type QueryParams = Record<string, string | number | boolean | null | undefined>;

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  get<T>(url: string, params?: QueryParams): Observable<T> {
    return this.http.get<T>(this.path(url), { params: this.params(params) });
  }

  post<T>(url: string, body: unknown): Observable<T> {
    return this.http.post<T>(this.path(url), body);
  }

  patch<T>(url: string, body: unknown): Observable<T> {
    return this.http.patch<T>(this.path(url), body);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.path(url));
  }

  private path(url: string): string {
    return `${this.baseUrl}${url.startsWith('/') ? url : `/${url}`}`;
  }

  private params(params?: QueryParams): HttpParams {
    return Object.entries(params ?? {}).reduce((httpParams, [key, value]) => {
      return value === null || value === undefined || value === '' ? httpParams : httpParams.set(key, String(value));
    }, new HttpParams());
  }
}
