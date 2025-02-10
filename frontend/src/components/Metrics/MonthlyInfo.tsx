'use client';
import React from 'react';
import { useMetrics } from '@/hooks/useMetrics';
import { TableTitle } from '../ui/table-title';
import { ErrorState } from '../ui/error-state';

export const MonthlyInfo = () => {
  const { trends, loading, error } = useMetrics();

  if (error) {
    return <ErrorState message={error} />;
  }

  if (loading || !trends) {
    return <div className="bg-gray-800 rounded-lg p-4 animate-pulse h-[160px]" />;
  }

  const currentMonth = new Date().toLocaleString('es-ES', { month: 'long' });
  const currentRevenue = trends.revenue[0]?.value || 0;
  const lastMonthRevenue = trends.revenue[1]?.value || 0;
  const goal = Math.round(lastMonthRevenue * 1.1); 

  return (
    <div className="bg-gray-800 rounded-lg p-4 text-white">
      <TableTitle title="Información Mensual" />
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Mes</span>
          <span className="capitalize">{currentMonth}</span>
        </div>
        <div className="flex justify-between">
          <span>Ingresos Actuales</span>
          <span>${currentRevenue.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Meta Mensual</span>
          <span>${goal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Progreso</span>
          <span className={currentRevenue >= goal ? 'text-green-400' : 'text-yellow-400'}>
            {Math.round((currentRevenue / goal) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}; 