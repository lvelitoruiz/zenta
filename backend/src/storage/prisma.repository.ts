import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  IRepository,
  Product,
  Organization,
  Metric,
  PaginatedResponse,
} from '../common/interfaces/repository.interface';
import {
  Product as PrismaProduct,
  Organization as PrismaOrg,
  Metric as PrismaMetric,
} from '@prisma/client';

@Injectable()
export class PrismaRepository implements IRepository {
  constructor(private prisma: PrismaService) {}

  async getProducts(
    organizationId: number,
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<Product>> {
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where: { organizationId },
        skip,
        take: limit,
      }),
      this.prisma.product.count({ where: { organizationId } }),
    ]);

    return {
      items: products.map(
        (p): Product => ({
          id: p.id,
          name: p.name,
          price: Number(p.price),
          stock: p.stock,
          organizationId: p.organizationId,
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
        }),
      ),
      total,
      page,
      limit,
    };
  }

  async getProduct(id: number): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    return product
      ? {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          stock: product.stock,
          organizationId: product.organizationId,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        }
      : null;
  }

  async addProduct(
    product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Product> {
    const newProduct: PrismaProduct = await this.prisma.product.create({
      data: product,
    });
    return {
      id: newProduct.id,
      name: newProduct.name,
      price: Number(newProduct.price),
      stock: newProduct.stock,
      organizationId: newProduct.organizationId,
      createdAt: newProduct.createdAt,
      updatedAt: newProduct.updatedAt,
    };
  }

  async updateProduct(
    id: number,
    data: Partial<Omit<Product, 'id'>>,
  ): Promise<Product | null> {
    const updated: PrismaProduct = await this.prisma.product.update({
      where: { id },
      data,
    });
    return {
      id: updated.id,
      name: updated.name,
      price: Number(updated.price),
      stock: updated.stock,
      organizationId: updated.organizationId,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    };
  }

  async deleteProduct(id: number): Promise<boolean> {
    await this.prisma.product.delete({
      where: { id },
    });
    return true;
  }

  async getOrganizations(): Promise<Organization[]> {
    const orgs: PrismaOrg[] = await this.prisma.organization.findMany();
    return orgs.map(
      (o: PrismaOrg): Organization => ({
        id: o.id,
        name: o.name,
        createdAt: o.createdAt,
        updatedAt: o.updatedAt,
      }),
    );
  }

  async getOrganization(id: number): Promise<Organization | null> {
    const org = await this.prisma.organization.findUnique({
      where: { id },
    });
    return org
      ? {
          id: org.id,
          name: org.name,
          createdAt: org.createdAt,
          updatedAt: org.updatedAt,
        }
      : null;
  }

  async getMetrics(organizationId: number): Promise<Metric[]> {
    const metrics: PrismaMetric[] = await this.prisma.metric.findMany({
      where: { organizationId },
      orderBy: { date: 'desc' },
    });
    return metrics.map(
      (m: PrismaMetric): Metric => ({
        id: m.id,
        organizationId: m.organizationId,
        totalRevenue: Number(m.totalRevenue),
        totalProducts: m.totalProducts || 0,
        lowStockItems: m.lowStockItems || 0,
        date: m.date,
        createdAt: m.createdAt,
      }),
    );
  }

  async addMetric(metric: Omit<Metric, 'id' | 'createdAt'>): Promise<Metric> {
    const newMetric: PrismaMetric = await this.prisma.metric.create({
      data: metric,
    });
    return {
      id: newMetric.id,
      organizationId: newMetric.organizationId,
      totalRevenue: Number(newMetric.totalRevenue),
      totalProducts: newMetric.totalProducts || 0,
      lowStockItems: newMetric.lowStockItems || 0,
      date: newMetric.date,
      createdAt: newMetric.createdAt,
    };
  }

  async seedData(
    organizations: Organization[],
    products: Product[],
    metrics: Metric[],
  ): Promise<void> {
    await this.prisma.metric.deleteMany();
    await this.prisma.product.deleteMany();
    await this.prisma.organization.deleteMany();

    await this.prisma.organization.createMany({ data: organizations });
    await this.prisma.product.createMany({
      data: products.map((p) => ({
        ...p,
        price: p.price.toString(),
      })),
    });
    await this.prisma.metric.createMany({
      data: metrics.map((m) => ({
        ...m,
        totalRevenue: m.totalRevenue.toString(),
      })),
    });
  }
}
