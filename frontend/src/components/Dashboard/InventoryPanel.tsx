'use client';
import React from 'react';
import { Icon } from '@/components/ui/icon';
import { 
  faBoxes, 
  faExclamationTriangle, 
  faBan,
  faSync 
} from '@fortawesome/free-solid-svg-icons';
import { useMetrics } from '@/hooks/useMetrics';

export const InventoryPanel = () => {
  const { overview, loading } = useMetrics();

  if (loading || !overview) {
    return <div className="bg-gray-800 rounded-lg p-4 animate-pulse h-[160px]" />;
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 text-white">
      <h2 className="text-lg font-semibold mb-4">Estado del Inventario</h2>
      <div className="grid grid-cols-2 gap-10">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <Icon icon={faBoxes} className="text-blue-400" />
              Total Items
            </span>
            <span>{overview.totalProducts}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <Icon icon={faExclamationTriangle} className="text-yellow-400" />
              Stock Bajo
            </span>
            <span>{overview.lowStockItems}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <Icon icon={faBan} className="text-red-400" />
              Sin Stock
            </span>
            <span>{overview.lowStockItems}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <Icon icon={faSync} className="text-green-400" />
              Por Reordenar
            </span>
            <span>{Math.round(overview.lowStockItems * 1.5)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 