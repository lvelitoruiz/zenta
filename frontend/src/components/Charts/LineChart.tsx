'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-gray-800 rounded-lg animate-pulse" />
});

export const LineChart = () => {
  const data: Plotly.Data[] = [{
    x: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
    y: [12, 14, 16, 14, 13, 15, 17, 18, 19],
    type: 'scatter' as const,
    mode: 'lines+markers' as const,
    name: 'Line 1',
    line: { color: '#4ade80' }
  }];

  const layout: Partial<Plotly.Layout> = {
    title: 'Default Graph',
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