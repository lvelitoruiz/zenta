'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-gray-800 rounded-lg animate-pulse" />
});

export const HistogramChart = () => {
  const data: Plotly.Data[] = [
    {
      type: 'histogram' as const,
      x: [1, 2, 2, 3, 3, 3, 4, 4, 5],
      name: 'PV',
      opacity: 0.75,
    },
    {
      type: 'histogram' as const,
      x: [2, 3, 3, 4, 4, 4, 5, 5, 6],
      name: 'OUT',
      opacity: 0.75,
    }
  ];

  const layout: Partial<Plotly.Layout> = {
    title: 'Histograma y densidad',
    barmode: 'overlay' as const,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: '#fff' },
    xaxis: { gridcolor: '#444' },
    yaxis: { gridcolor: '#444' },
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