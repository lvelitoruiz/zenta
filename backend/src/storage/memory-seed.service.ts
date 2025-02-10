import { Injectable } from '@nestjs/common';
import { MemoryRepository } from './memory.repository';
import {
  Organization,
  Product,
  Metric,
} from '../common/interfaces/repository.interface';

@Injectable()
export class MemorySeedService {
  constructor(public repository: MemoryRepository) {}

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
      {
        id: 3,
        name: 'Xiaomi Store',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const products: Product[] = organizations.flatMap((org) =>
      Array.from({ length: 100 }, (_, i) => ({
        id: org.id * 1000 + i + 1,
        name: `${org.name} Product ${i + 1}`,
        price: Math.round(Math.random() * 1000 * 100) / 100,
        stock: Math.floor(Math.random() * 100),
        organizationId: org.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    );

    const metrics: Metric[] = organizations.flatMap((org) => {
      return Array.from({ length: 30 }).map((_, index) => {
        const date = new Date();
        date.setDate(date.getDate() - index);
        const orgProducts = products.filter((p) => p.organizationId === org.id);

        return {
          id: org.id * 1000 + index + 1,
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

  getRepository() {
    return this.repository;
  }
}
