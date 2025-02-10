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

export const CategoryPanel = () => {
  const { overview, loading } = useMetrics();

  if (loading || !overview) {
    return <div className="bg-gray-800 rounded-lg p-4 animate-pulse h-[160px]" />;
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 text-white">
      <h2 className="text-lg font-semibold mb-4">Análisis por Categorías</h2>
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