'use client';
import React from 'react';
import { MetricCardProps } from '@/types/metrics';

export const MetricCard = ({ title, value, subtitle }: MetricCardProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 text-white">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-gray-400 text-sm">{subtitle}</p>
    </div>
  );
}; 