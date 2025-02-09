'use client';
import React from 'react';
import { Icon } from '@/components/ui/icon';
import { 
  faBoxes, 
  faExclamationTriangle, 
  faBan,
  faSync 
} from '@fortawesome/free-solid-svg-icons';
import { InventoryMetrics } from '@/types/metrics';

export const InventoryPanel = () => {
  // Esto vendrá del estado de Redux
  const metrics: InventoryMetrics = {
    totalItems: 1500,
    lowStock: 45,
    outOfStock: 12,
    reorderNeeded: 28
  };

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
            <span>{metrics.totalItems}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <Icon icon={faExclamationTriangle} className="text-yellow-400" />
              Stock Bajo
            </span>
            <span>{metrics.lowStock}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <Icon icon={faBan} className="text-red-400" />
              Sin Stock
            </span>
            <span>{metrics.outOfStock}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <Icon icon={faSync} className="text-green-400" />
              Por Reordenar
            </span>
            <span>{metrics.reorderNeeded}</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 