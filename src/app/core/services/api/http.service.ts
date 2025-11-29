import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http = inject(HttpClient);
  
  private readonly baseUrl = environment.apiUrl;

  // Generic HTTP methods with better typing
  get<T>(url: string, params?: any) {
    return this.http.get<T>(this.buildUrl(url), { params: this.buildParams(params) });
  }

  post<T>(url: string, body: any) {
    return this.http.post<T>(this.buildUrl(url), body);
  }

  put<T>(url: string, body: any) {
    return this.http.put<T>(this.buildUrl(url), body);
  }

  patch<T>(url: string, body: any) {
    return this.http.patch<T>(this.buildUrl(url), body);
  }

  delete<T>(url: string) {
    return this.http.delete<T>(this.buildUrl(url));
  }

  private buildUrl(url: string): string {
    return `${this.baseUrl}/${url}`;
  }

  private buildParams(params: any): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }
    return httpParams;
  }
}