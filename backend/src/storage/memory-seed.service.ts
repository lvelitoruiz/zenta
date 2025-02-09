import { Injectable } from '@nestjs/common';
import { MemoryRepository } from './memory.repository';
import {
  Organization,
  Product,
  Metric,
} from '../common/interfaces/repository.interface';

@Injectable()
export class MemorySeedService {
  constructor(private repository: MemoryRepository) {}

  async seed() {
    const organizations: Organization[] = [
      {
        id: 1,
        name: 'Apple Store',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Samsung Store',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const products: Product[] = [
      {
        id: 1,
        name: 'MacBook Pro',
        price: 1299.99,
        stock: 50,
        organizationId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'iPhone 15',
        price: 999.99,
        stock: 100,
        organizationId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: 'iPad Air',
        price: 599.99,
        stock: 75,
        organizationId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: 'Samsung S24',
        price: 899.99,
        stock: 80,
        organizationId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: 'Samsung Tab S9',
        price: 649.99,
        stock: 45,
        organizationId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const metrics: Metric[] = organizations.flatMap((org) => {
      return Array.from({ length: 30 }).map((_, index) => {
        const date = new Date();
        date.setDate(date.getDate() - index);
        const orgProducts = products.filter((p) => p.organizationId === org.id);

        return {
          id: index + 1,
          organizationId: org.id,
          totalRevenue: orgProducts.reduce(
            (sum, p) => sum + p.price * p.stock,
            0,
          ),
          totalProducts: orgProducts.length,
          lowStockItems: orgProducts.filter((p) => p.stock < 50).length,
          date,
          createdAt: date,
        };
      });
    });

    await this.repository.seedData(organizations, products, metrics);
  }
}
