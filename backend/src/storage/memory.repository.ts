import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IRepository,
  Product,
  Organization,
  Metric,
  PaginatedResponse,
} from '../common/interfaces/repository.interface';

@Injectable()
export class MemoryRepository implements IRepository {
  private static instance: MemoryRepository;
  public organizations: Organization[] = [];
  public products: Product[] = [];
  public metrics: Map<number, Metric[]> = new Map();

  constructor() {
    if (!MemoryRepository.instance) {
      MemoryRepository.instance = this;
    }
    return MemoryRepository.instance;
  }

  async seedData(
    organizations: Organization[],
    products: Product[],
    metrics: Metric[],
  ): Promise<void> {
    this.organizations = organizations;
    this.products = products;
    metrics.forEach((metric) => {
      const orgMetrics = this.metrics.get(metric.organizationId) || [];
      orgMetrics.push(metric);
      this.metrics.set(metric.organizationId, orgMetrics);
    });

    await Promise.resolve();
  }

  async getProducts(
    organizationId: number,
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<Product>> {
    const allProducts = this.products.filter(
      (p) => p.organizationId === organizationId,
    );

    const start = (page - 1) * limit;
    const end = start + limit;

    const result = {
      items: allProducts.slice(start, end),
      total: allProducts.length,
      page,
      limit,
    };

    return await Promise.resolve(result);
  }

  async getProduct(id: number): Promise<any> {
    const product = this.products.find((p) => p.id === id);
    return Promise.resolve(product);
  }

  async addProduct(
    product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Product> {
    const newId =
      this.products.length > 0
        ? Math.max(...this.products.map((p) => p.id)) + 1
        : 1;
    const newProduct: Product = {
      ...product,
      id: newId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.push(newProduct);
    return Promise.resolve(newProduct);
  }

  async updateProduct(
    id: number,
    data: Partial<Omit<Product, 'id'>>,
  ): Promise<Product | null> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products[index] = {
        ...this.products[index],
        ...data,
        updatedAt: new Date(),
      };
      return Promise.resolve(this.products[index]);
    }
    return Promise.resolve(null);
  }

  async deleteProduct(id: number): Promise<boolean> {
    const index = this.products.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    this.products.splice(index, 1);
    return Promise.resolve(true);
  }

  async getOrganizations(): Promise<Organization[]> {
    return Promise.resolve(this.organizations);
  }

  async getOrganization(id: number): Promise<Organization | null> {
    return Promise.resolve(this.organizations.find((o) => o.id === id) || null);
  }

  async getMetrics(organizationId: number): Promise<Metric[]> {
    return Promise.resolve(this.metrics.get(organizationId) || []);
  }

  async addMetric(metric: Omit<Metric, 'id' | 'createdAt'>): Promise<Metric> {
    const orgMetrics = this.metrics.get(metric.organizationId) || [];
    const newMetric: Metric = {
      ...metric,
      id: orgMetrics.length + 1,
      createdAt: new Date(),
    };
    orgMetrics.push(newMetric);
    this.metrics.set(metric.organizationId, orgMetrics);
    return Promise.resolve(newMetric);
  }
}
