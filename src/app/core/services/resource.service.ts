import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api-endpoints.constant';
import { UserRole } from '../enums/user-role.enum';
import { ProductCondition } from '../enums/product-condition.enum';
import { ProductStatus } from '../enums/product-status.enum';
import { PtaStatus } from '../enums/pta-status.enum';
import { PaymentMethod } from '../enums/payment-method.enum';
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

export type ResourceValue = string | number | boolean | null | undefined;
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

  private extractItems<T>(response: PaginatedApiResponse<T>): T[] {
    return response.items || response.data || [];
  }

  list(kind: ResourceKind, params?: QueryParams): Observable<ResourceRecord[]> {
    return this.api.get<PaginatedApiResponse<ResourceRecord>>(RESOURCE_CONFIGS[kind].endpoint, params).pipe(
      map(response => this.extractItems(response)),
      catchError(() => of(this.mock(kind)))
    );
  }

  get(kind: ResourceKind, id: string): Observable<ResourceRecord> {
    return this.api.get<PaginatedApiResponse<ResourceRecord>>(`${RESOURCE_CONFIGS[kind].endpoint}/${id}`).pipe(
      map(response => this.extractItems(response)?.[0] || {}),
      catchError(() => of(this.mock(kind)[0] ?? {}))
    );
  }

  create(kind: ResourceKind, payload: ResourceRecord): Observable<ResourceRecord> {
    return this.api.post<PaginatedApiResponse<ResourceRecord>>(RESOURCE_CONFIGS[kind].endpoint, payload).pipe(
      map(response => this.extractItems(response)?.[0] || payload),
      catchError(() => of(payload))
    );
  }

  update(kind: ResourceKind, id: string, payload: ResourceRecord): Observable<ResourceRecord> {
    return this.api.patch<PaginatedApiResponse<ResourceRecord>>(`${RESOURCE_CONFIGS[kind].endpoint}/${id}`, payload).pipe(
      map(response => this.extractItems(response)?.[0] || payload),
      catchError(() => of(payload))
    );
  }

  private mock(kind: ResourceKind): ResourceRecord[] {
    const common = { id: 1, isActive: true };
    const product = { ...common, brand: 'Apple', model: 'iPhone 13 Pro', imei1: '356789123456789', condition: ProductCondition.EXCELLENT, ptaStatus: PtaStatus.APPROVED, status: ProductStatus.IN_STOCK, expectedSalePrice: 185000, city: 'Lahore', shopName: 'Hafeez Mobile Center', image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=900&q=80' };
    const rows: Record<ResourceKind, ResourceRecord[]> = {
      shops: [{ ...common, name: 'Hafeez Mobile Center', city: 'Lahore', area: 'Gulberg', phone: '04235700000', address: 'Shop 12, Hafeez Center, Gulberg', description: 'Trusted second-hand mobile shop in Lahore' }],
      sellers: [{ ...common, name: 'Ali Raza', phone: '0300-2222222', cnic: '35202-1234567-1', complianceVerified: true }],
      products: [product],
      purchases: [{ ...common, receiptNumber: 'PUR-1001', purchaseDate: '2026-04-25', purchasePrice: 165000 }],
      inventory: [product],
      customers: [{ ...common, name: 'Sara Khan', phone: '0300-3333333', cnic: '35202-7654321-1' }],
      sales: [{ ...common, invoiceNumber: 'INV-1001', saleDate: '2026-04-25', salePrice: 190000, paymentMethod: PaymentMethod.CASH, saleType: SaleType.OFFLINE }],
      expenses: [{ ...common, title: 'Display repair', type: 'REPAIR', amount: 5000, createdAt: '2026-04-25' }],
      reports: [{ label: 'Gross Profit', value: 'Rs. 240,000', tone: 'success' }],
      users: [{ ...common, name: 'Admin User', phone: '0300-0000000', email: 'admin@example.com', role: UserRole.ADMIN }],
      'marketplace-shops': [{ ...common, name: 'Hafeez Mobile Center', city: 'Lahore', area: 'Gulberg', phone: '0300-1234567' }],
      'marketplace-products': [product]
    };
    return rows[kind];
  }
}
