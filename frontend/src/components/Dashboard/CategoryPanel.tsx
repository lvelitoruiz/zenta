'use client';
import React from 'react';
import { Icon } from '@/components/ui/icon';
import { 
  faTags,
  faChartLine,
  faPercentage,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { useMetrics } from '@/hooks/useMetrics';
import { TableTitle } from '../ui/table-title';
import { ErrorState } from '@/components/ui/error-state';

export const CategoryPanel = () => {
  const { overview, loading, error } = useMetrics();

  if (error) {
    return <ErrorState message={error} />;
  }

  if (loading || !overview) {
    return <div className="bg-gray-800 rounded-lg p-4 animate-pulse h-[160px]" />;
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 text-white">
      <TableTitle title="Análisis por Categorías" />
      <div className="grid grid-cols-2 gap-10">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <Icon icon={faStar} className="text-yellow-400" />
              Top
            </span>
            <span>{overview.topCategory || 'Sin datos'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <Icon icon={faChartLine} className="text-green-400" />
              Crecimiento
            </span>
            <span>{overview.categoryGrowth?.toFixed(1) || 0}%</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <Icon icon={faTags} className="text-blue-400" />
              Categorías
            </span>
            <span>{overview.categoriesActive || 0}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <Icon icon={faPercentage} className="text-purple-400" />
              Margen Prom.
            </span>
            <span>{overview.avgCategoryMargin?.toFixed(1) || 0}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 