import { Injectable, inject } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api-endpoints.constant';
import { SaleType } from '../enums/sale-type.enum';
import { ApiService, QueryParams } from './api.service';
import { PaginatedApiResponse } from '../models/api-response.model';

export type ResourceKind =
  | 'shops'
  | 'sellers'
  | 'products'
  | 'purchases'
  | 'inventory'
  | 'customers'
  | 'sales'
  | 'expenses'
  | 'reports'
  | 'users'
  | 'marketplace-shops'
  | 'marketplace-products';

export interface ResourceConfig {
  kind: ResourceKind;
  title: string;
  endpoint: string;
  columns: string[];
  createRoute?: string;
}

export type ResourceValue = string | number | boolean | ResourceRecord | null | undefined;
export type ResourceRecord = Record<string, ResourceValue>;

export const RESOURCE_CONFIGS: Record<ResourceKind, ResourceConfig> = {
  shops: { kind: 'shops', title: 'Shops', endpoint: API_ENDPOINTS.SHOPS, columns: ['name', 'city', 'area', 'phone', 'isActive'], createRoute: '/shops/create' },
  sellers: { kind: 'sellers', title: 'Sellers', endpoint: '/sellers', columns: ['name', 'phone', 'cnic', 'complianceVerified'], createRoute: '/sellers/create' },
  products: { kind: 'products', title: 'Products', endpoint: '/products', columns: ['brand', 'model', 'imei1', 'condition', 'ptaStatus', 'status', 'expectedSalePrice'], createRoute: '/products/create' },
  purchases: { kind: 'purchases', title: 'Purchases', endpoint: '/purchases', columns: ['receiptNumber', 'purchaseDate', 'purchasePrice'], createRoute: '/purchases/create' },
  inventory: { kind: 'inventory', title: 'Inventory', endpoint: '/inventory', columns: ['brand', 'model', 'imei1', 'status', 'expectedSalePrice'] },
  customers: { kind: 'customers', title: 'Customers', endpoint: API_ENDPOINTS.CUSTOMERS, columns: ['name', 'phone', 'cnic'], createRoute: '/customers/create' },
  sales: { kind: 'sales', title: 'Sales', endpoint: '/sales', columns: ['invoiceNumber', 'saleDate', 'salePrice', 'paymentMethod', 'saleType'], createRoute: '/sales/create' },
  expenses: { kind: 'expenses', title: 'Expenses', endpoint: '/expenses', columns: ['title', 'type', 'amount', 'createdAt'], createRoute: '/expenses/create' },
  reports: { kind: 'reports', title: 'Reports', endpoint: API_ENDPOINTS.REPORTS, columns: ['label', 'value', 'tone'] },
  users: { kind: 'users', title: 'Users', endpoint: API_ENDPOINTS.USERS, columns: ['name', 'phone', 'email', 'role', 'isActive'] },
  'marketplace-shops': { kind: 'marketplace-shops', title: 'Marketplace Shops', endpoint: API_ENDPOINTS.MARKETPLACE_SHOPS, columns: ['name', 'city', 'area', 'phone'] },
  'marketplace-products': { kind: 'marketplace-products', title: 'Marketplace Products', endpoint: API_ENDPOINTS.MARKETPLACE_PRODUCTS, columns: ['brand', 'model', 'city', 'condition', 'ptaStatus', 'expectedSalePrice'] }
};

@Injectable({ providedIn: 'root' })
export class ResourceService {
  private readonly api = inject(ApiService);

  private extractItems<T>(response: PaginatedApiResponse<T> | T[] | T): T[] {
    if (Array.isArray(response)) return response;
    const paginated = response as PaginatedApiResponse<T>;
    return paginated.items || paginated.data || [];
  }

  private extractRecord<T extends ResourceRecord>(response: PaginatedApiResponse<T> | T): T {
    const items = this.extractItems(response);
    return items[0] || (response as T);
  }

  list(kind: ResourceKind, params?: QueryParams): Observable<ResourceRecord[]> {
    return this.listEndpoint(kind, params).pipe(
      switchMap((url) => this.api.get<PaginatedApiResponse<ResourceRecord>>(url, params)),
      map(response => this.extractItems(response))
    );
  }

  get(kind: ResourceKind, id: string): Observable<ResourceRecord> {
    return this.api.get<PaginatedApiResponse<ResourceRecord> | ResourceRecord>(`${RESOURCE_CONFIGS[kind].endpoint}/${id}`).pipe(
      map(response => this.extractRecord(response))
    );
  }

  create(kind: ResourceKind, payload: ResourceRecord): Observable<ResourceRecord> {
    return this.createEndpoint(kind, payload).pipe(
      switchMap((url) => this.api.post<PaginatedApiResponse<ResourceRecord> | ResourceRecord>(url, payload)),
      map(response => this.extractRecord(response))
    );
  }

  update(kind: ResourceKind, id: string, payload: ResourceRecord): Observable<ResourceRecord> {
    return this.api.patch<PaginatedApiResponse<ResourceRecord> | ResourceRecord>(`${RESOURCE_CONFIGS[kind].endpoint}/${id}`, payload).pipe(
      map(response => this.extractRecord(response))
    );
  }

  private listEndpoint(kind: ResourceKind, params?: QueryParams): Observable<string> {
    if (kind === 'reports') return this.shopEndpoint('/shops/:shopId/reports/dashboard', params);
    if (kind === 'inventory') return this.shopEndpoint('/shops/:shopId/inventory', params);
    if (['sellers', 'products', 'purchases', 'sales', 'expenses'].includes(kind)) {
      return this.shopEndpoint(`/shops/:shopId/${kind}`, params);
    }
    return new Observable((subscriber) => {
      subscriber.next(RESOURCE_CONFIGS[kind].endpoint);
      subscriber.complete();
    });
  }

  private createEndpoint(kind: ResourceKind, payload: ResourceRecord): Observable<string> {
    if (kind === 'sales') {
      const type = payload['saleType'] === SaleType.ONLINE ? 'online' : 'offline';
      return this.shopEndpoint(`/shops/:shopId/sales/${type}`, payload);
    }
    if (['sellers', 'products', 'purchases', 'expenses'].includes(kind)) {
      return this.shopEndpoint(`/shops/:shopId/${kind}`, payload);
    }
    return new Observable((subscriber) => {
      subscriber.next(RESOURCE_CONFIGS[kind].endpoint);
      subscriber.complete();
    });
  }

  private shopEndpoint(template: string, source?: QueryParams | ResourceRecord): Observable<string> {
    const providedShopId = source?.['shopId'];
    if (providedShopId) {
      return new Observable((subscriber) => {
        subscriber.next(template.replace(':shopId', String(providedShopId)));
        subscriber.complete();
      });
    }
    return this.api.get<PaginatedApiResponse<ResourceRecord>>(API_ENDPOINTS.MY_SHOPS).pipe(
      map((response) => {
        const shop = this.extractItems(response)[0];
        if (!shop?.['id']) throw new Error('Please create and approve a shop before using this module');
        return template.replace(':shopId', String(shop['id']));
      })
    );
  }
}
