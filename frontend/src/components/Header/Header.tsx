'use client';
import React from 'react';
import { MonthlyInfo } from './MonthlyInfo';
import { useAppSelector } from '@/store/hooks';
import { MetricCard } from './MetricCard';
import { RootState } from '@/store/store';
import { InventoryPanel } from '../Dashboard/InventoryPanel';
import { CategoryPanel } from '../Dashboard/CategoryPanel';

export const Header = () => {
  const { data: metricsData } = useAppSelector((state: RootState) => state.metrics);

  console.log('metricsData: ',metricsData);
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MonthlyInfo 
          month={metricsData.currentMonth}
          demand={metricsData.demand}
          goal={metricsData.goal}
        />
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
          value={metricsData.totalRevenue} 
          subtitle="Últimos 30 días" 
        />
        <MetricCard 
          title="Productos Bajos" 
          value={metricsData.lowStockItems} 
          subtitle="Stock bajo" 
        />
      </div>
    </div>
  );
}; 