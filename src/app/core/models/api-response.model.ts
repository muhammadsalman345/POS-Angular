export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success?: boolean;
  statusCode?: number;
  path?: string;
  timestamp?: string;
  error?: unknown;
  message?: string;
  token?: string;
  data?: T;
}

export interface PaginatedApiResponse<T> {
  items?: T[];
  data?: T[];
  meta: PaginationMeta;
}
