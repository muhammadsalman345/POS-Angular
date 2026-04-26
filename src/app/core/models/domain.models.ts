import { PaymentMethod } from '../enums/payment-method.enum';
import { ProductCondition } from '../enums/product-condition.enum';
import { ProductStatus } from '../enums/product-status.enum';
import { PtaStatus } from '../enums/pta-status.enum';
import { SaleType } from '../enums/sale-type.enum';
import { UserRole } from '../enums/user-role.enum';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Shop {
  id: number;
  ownerId?: number;
  name: string;
  address?: string;
  city: string;
  area: string;
  phone: string;
  logo?: string | null;
  description?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface Seller {
  id: number;
  shopId?: number;
  name: string;
  fatherName?: string;
  cnic: string;
  phone: string;
  address: string;
  cnicFrontImage?: string;
  cnicBackImage?: string;
  photo?: string | null;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface ProductImage {
  id: number;
  productId?: number;
  imageUrl: string;
  isPrimary?: boolean;
  createdAt?: string;
  deletedAt?: string | null;
}

export interface Product {
  id: number;
  shopId?: number;
  sellerId?: number;
  brand: string;
  model: string;
  variant?: string;
  imei1?: string;
  imei2?: string;
  storage?: string;
  ram?: string;
  color?: string;
  condition: ProductCondition;
  batteryHealth?: number;
  accessories?: string;
  purchasePrice: string | number;
  expectedSalePrice: string | number;
  finalSalePrice?: string | number | null;
  status: ProductStatus;
  ptaStatus: PtaStatus;
  description?: string;
  purchaseDate?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  images?: ProductImage[];
  seller?: Seller;
  shop?: Shop;
}

export interface Customer {
  id: number;
  userId?: number | null;
  name: string;
  phone: string;
  cnic: string;
  address: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface Purchase {
  id: number;
  shopId?: number;
  sellerId?: number;
  productId?: number;
  purchasePrice: string | number;
  purchaseDate: string;
  notes?: string;
  receiptNumber: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  seller?: Seller;
  product?: Product;
  shop?: Shop;
}

export interface Sale {
  id: number;
  shopId?: number;
  productId?: number;
  customerId?: number;
  salePrice: string | number;
  paymentMethod: PaymentMethod;
  saleType: SaleType;
  warrantyDays?: number;
  invoiceNumber: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  shop?: Shop;
  customer?: Customer;
  product?: Product;
}

export interface Expense {
  id: number;
  shopId?: number;
  productId?: number;
  title: string;
  amount: string | number;
  type: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface Expense {
  id: number;
  title: string;
  type: string;
  amount: number;
  createdAt?: string;
}

export interface ReportMetric {
  label: string;
  value: string | number;
  tone?: 'primary' | 'success' | 'warning' | 'danger';
}
