export interface TrendPoint {
  date: Date;
  value: number;
}

export interface MetricsTrends {
  revenue: TrendPoint[];
  products: TrendPoint[];
  lowStock: TrendPoint[];
}
