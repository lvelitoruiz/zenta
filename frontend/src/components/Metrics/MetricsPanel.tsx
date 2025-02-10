'use client';
import React from 'react';
import { MonthlyInfo } from './MonthlyInfo';
import { useAppSelector } from '@/store/hooks';
import { MetricCard } from './MetricCard';
import { RootState } from '@/store/store';
import { InventoryPanel } from '../Dashboard/InventoryPanel';
import { CategoryPanel } from '../Dashboard/CategoryPanel';
import { useMetrics } from '@/hooks/useMetrics';
import { Loader } from '../ui/loader';

export const MetricsPanel = () => {
  const { data: metricsData } = useAppSelector((state: RootState) => state.metrics);
  const { overview, loading } = useMetrics();
  
  if (loading) return <Loader />;
  if (!overview) return null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MonthlyInfo />
        <InventoryPanel />
        <CategoryPanel />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard 
          title="Productos Totales" 
          value={metricsData.totalProducts} 
          subtitle="En inventario" 
        />
        <MetricCard 
          title="Precio Promedio" 
          value={metricsData.averagePrice} 
          subtitle="Por producto" 
        />
        <MetricCard 
          title="Ingresos Totales" 
          value={`$${overview.totalRevenue.toLocaleString()}`} 
          subtitle="Total de ingresos" 
        />
        <MetricCard 
          title="Productos Bajos" 
          value={overview.lowStockItems.toString()} 
          subtitle="Productos con stock bajo" 
        />
      </div>
    </div>
  );
}; 