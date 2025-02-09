'use client';
import React from 'react';
import { HistogramChart } from './HistogramChart';
import { LineChart } from './LineChart';

export const ChartsContainer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <HistogramChart />
      <LineChart />
    </div>
  );
}; 