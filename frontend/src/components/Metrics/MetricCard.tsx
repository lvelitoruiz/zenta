'use client';
import React from 'react';
import { MetricCardProps } from '@/types/metrics';
import { TableTitle } from '../ui/table-title';

export const MetricCard = ({ title, value, subtitle }: MetricCardProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 text-white">
      <TableTitle title={title} />
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-gray-400 text-sm">{subtitle}</p>
    </div>
  );
}; 