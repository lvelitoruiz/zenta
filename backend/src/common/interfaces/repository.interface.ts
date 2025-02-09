export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  organizationId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Organization {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Metric {
  id: number;
  organizationId: number;
  totalRevenue: number;
  totalProducts: number;
  lowStockItems: number;
  date: Date;
  createdAt: Date;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export interface IRepository {
  getProducts(
    organizationId: number,
    page?: number,
    limit?: number,
  ): Promise<PaginatedResponse<Product>>;
  getProduct(id: number): Promise<Product | null>;
  addProduct(
    product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Product>;
  updateProduct(
    id: number,
    data: Partial<Omit<Product, 'id'>>,
  ): Promise<Product | null>;
  deleteProduct(id: number): Promise<boolean>;

  getOrganizations(): Promise<Organization[]>;
  getOrganization(id: number): Promise<Organization | null>;

  getMetrics(organizationId: number): Promise<Metric[]>;
  addMetric(metric: Omit<Metric, 'id' | 'createdAt'>): Promise<Metric>;
  seedData?(
    organizations: Organization[],
    products: Product[],
    metrics: Metric[],
  ): Promise<void>;
}
