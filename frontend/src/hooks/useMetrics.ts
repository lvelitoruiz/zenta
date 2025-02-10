import { useCallback, useEffect, useState } from 'react';
import { useOrganizationStore } from '@/store/organizationStore';

interface MetricsOverview {
  totalRevenue: number;
  totalProducts: number;
  lowStockItems: number;
  topCategory: string;
  categoryGrowth: number;
  categoriesActive: number;
  avgCategoryMargin: number;
}

interface TrendPoint {
  date: Date;
  value: number;
}

interface MetricsTrends {
  revenue: TrendPoint[];
  products: TrendPoint[];
  lowStock: TrendPoint[];
}

export const useMetrics = () => {
  const { selectedOrganizationId } = useOrganizationStore();
  const [overview, setOverview] = useState<MetricsOverview | null>(null);
  const [trends, setTrends] = useState<MetricsTrends | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    if (!selectedOrganizationId) return;

    setLoading(true);
    setError(null);
    try {
      const [overviewResponse, trendsResponse] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/metrics/overview?organizationId=${selectedOrganizationId}`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/metrics/trends?organizationId=${selectedOrganizationId}`)
      ]);

      if (!overviewResponse.ok || !trendsResponse.ok) {
        throw new Error('Error al obtener las métricas');
      }

      const overviewData = await overviewResponse.json();
      const trendsData = await trendsResponse.json();

      setOverview(overviewData);
      setTrends(trendsData);
    } catch (error) {
      console.error('Error fetching metrics:', error);
      setError('Error al cargar las métricas');
    } finally {
      setLoading(false);
    }
  }, [selectedOrganizationId]);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  return { overview, trends, loading, error };
}; 