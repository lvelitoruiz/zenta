export interface MetricsData {
  totalProducts: number;
  totalRevenue: number;
  averagePrice: number;
  lowStockItems: number;
  currentMonth: string;
  demand: number;
  goal: number;
}

export interface InventoryMetrics {
  totalItems: number;
  lowStock: number;
  outOfStock: number;
  reorderNeeded: number;
}

export interface CategoryMetrics {
  topCategory: string;
  categoryGrowth: number;
  categoriesActive: number;
  avgCategoryMargin: number;
}

export interface MetricCardProps {
  title: string;
  value: number;
  subtitle: string;
}

export interface MonthlyInfoProps {
  month: string;
  demand: number;
  goal: number;
} 