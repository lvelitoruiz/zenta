'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useMetrics } from '@/hooks/useMetrics';

const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-gray-800 rounded-lg animate-pulse" />
});

export const LineChart = () => {
  const { trends, loading } = useMetrics();

  if (loading || !trends) {
    return <div className="h-[300px] bg-gray-800 rounded-lg animate-pulse" />;
  }

  const data: Plotly.Data[] = [
    {
      x: trends.revenue.map(point => point.date),
      y: trends.revenue.map(point => point.value),
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Ingresos',
      line: { color: '#4ade80' }
    },
    {
      x: trends.products.map(point => point.date),
      y: trends.products.map(point => point.value),
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Productos',
      line: { color: '#60a5fa' }
    },
    {
      x: trends.lowStock.map(point => point.date),
      y: trends.lowStock.map(point => point.value),
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Stock Bajo',
      line: { color: '#f87171' }
    }
  ];

  const layout: Partial<Plotly.Layout> = {
    title: 'Tendencias',
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: '#fff' },
    xaxis: { gridcolor: '#444' },
    yaxis: { gridcolor: '#444' },
    legend: {
      bgcolor: 'rgba(0,0,0,0)',
      font: { color: '#fff' }
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <Plot
        data={data}
        layout={layout}
        useResizeHandler={true}
        style={{ width: '100%', height: '300px' }}
        config={{ responsive: true }}
      />
    </div>
  );
}; 