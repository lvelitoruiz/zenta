import { Injectable, Inject } from '@nestjs/common';
import { MetricsOverviewDto } from './dto/metric.dto';
import { MetricsTrends } from './types/metrics.types';
import { IRepository } from '../common/interfaces/repository.interface';

@Injectable()
export class MetricsService {
  constructor(
    @Inject('REPOSITORY')
    private readonly repository: IRepository,
  ) {}

  async getOverview(organizationId: number): Promise<MetricsOverviewDto> {
    const metrics = await this.repository.getMetrics(organizationId);
    const latestMetric = metrics[0];

    if (!latestMetric) {
      return {
        totalRevenue: 0,
        totalProducts: 0,
        lowStockItems: 0,
        topCategory: 'Sin datos',
        categoryGrowth: 0,
        categoriesActive: 0,
        avgCategoryMargin: 0,
      };
    }

    return {
      totalRevenue: latestMetric.totalRevenue,
      totalProducts: latestMetric.totalProducts,
      lowStockItems: latestMetric.lowStockItems,
      topCategory: 'Electrónicos',
      categoryGrowth: 15.5,
      categoriesActive: 8,
      avgCategoryMargin: 32.4,
    };
  }

  async getTrends(organizationId: number): Promise<MetricsTrends> {
    const metrics = await this.repository.getMetrics(organizationId);

    return {
      revenue: metrics.map((m) => ({
        date: m.date,
        value: m.totalRevenue,
      })),
      products: metrics.map((m) => ({
        date: m.date,
        value: m.totalProducts,
      })),
      lowStock: metrics.map((m) => ({
        date: m.date,
        value: m.lowStockItems,
      })),
    };
  }
}
