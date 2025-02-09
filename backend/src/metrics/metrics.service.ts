import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MetricDto, MetricsOverviewDto } from './dto/metric.dto';
import { Metric } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class MetricsService {
  constructor(private prisma: PrismaService) {}

  async getOverview(organizationId: number): Promise<MetricsOverviewDto> {
    const products = await this.prisma.product.findMany({
      where: { organizationId },
      select: { price: true, stock: true },
    });

    const totalProducts = products.length;
    const totalRevenue = products.reduce<number>(
      (sum: number, product: { price: Decimal; stock: number }) =>
        sum + Number(product.price) * product.stock,
      0,
    );
    const lowStockItems = products.filter(
      (product) => product.stock < 10,
    ).length;
    const averagePrice =
      totalProducts > 0
        ? products.reduce<number>(
            (sum: number, product: { price: Decimal }) =>
              sum + Number(product.price),
            0,
          ) / totalProducts
        : 0;

    return {
      totalRevenue,
      totalProducts,
      lowStockItems,
      averagePrice,
    };
  }

  async getTrends(organizationId: number): Promise<MetricDto[]> {
    const currentMetrics = await this.getOverview(organizationId);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const existingMetric = await this.prisma.metric.findFirst({
        where: {
          organizationId,
          date: {
            equals: date,
          },
        },
      });

      if (!existingMetric) {
        const randomFactor = 0.8 + Math.random() * 0.4;
        await this.prisma.metric.create({
          data: {
            organizationId,
            totalRevenue: new Decimal(
              currentMetrics.totalRevenue * randomFactor,
            ),
            totalProducts: Math.floor(
              currentMetrics.totalProducts * randomFactor,
            ),
            lowStockItems: Math.floor(
              currentMetrics.lowStockItems * randomFactor,
            ),
            date,
          },
        });
      }
    }

    const metrics = (await this.prisma.metric.findMany({
      where: {
        organizationId,
        date: {
          gte: thirtyDaysAgo,
        },
      },
      orderBy: {
        date: 'asc',
      },
    })) as Metric[];

    return metrics.map((metric) => ({
      id: metric.id,
      organizationId: metric.organizationId,
      totalRevenue: Number(metric.totalRevenue),
      totalProducts: metric.totalProducts ?? 0,
      lowStockItems: metric.lowStockItems ?? 0,
      date: metric.date,
      createdAt: metric.createdAt,
    }));
  }
}
