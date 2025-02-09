'use client';
import React from 'react';
import { MonthlyInfoProps } from '@/types/metrics';

export const MonthlyInfo = ({ month, demand, goal }: MonthlyInfoProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 text-white">
      <h2 className="text-lg font-semibold mb-4">Información Mensual</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Mes</span>
          <span>{month}</span>
        </div>
        <div className="flex justify-between">
          <span>Demanda</span>
          <span>{demand.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Meta</span>
          <span>{goal.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}; 