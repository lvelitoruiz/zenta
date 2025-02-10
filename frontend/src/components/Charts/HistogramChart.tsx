'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useOrganizationStore } from '@/store/organizationStore';
import { useState, useEffect } from 'react';
import { ErrorState } from '../ui/error-state';

const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-gray-800 rounded-lg animate-pulse" />
});

interface Product {
  id: number;
  price: number;
}

export const HistogramChart = () => {
  const { selectedOrganizationId } = useOrganizationStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedOrganizationId) return;

      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products?organizationId=${selectedOrganizationId}&page=1&limit=100`
        );

        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }

        const { items } = await response.json();
        setProducts(items);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedOrganizationId]);

  if (error) {
    return <ErrorState message={error} />;
  }

  if (loading || !products.length) {
    return <div className="h-[300px] bg-gray-800 rounded-lg animate-pulse" />;
  }

  const data: Plotly.Data[] = [
    {
      x: products.map(product => product.price),
      type: 'histogram',
      name: 'Distribución de Precios',
      marker: {
        color: '#60a5fa',
      },
      xbins: {
        start: Math.min(...products.map(p => p.price)),
        end: Math.max(...products.map(p => p.price)),
        size: (Math.max(...products.map(p => p.price)) - Math.min(...products.map(p => p.price))) / 20
      },
    },
  ];

  const layout: Partial<Plotly.Layout> = {
    title: 'Distribución de Precios',
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: '#fff' },
    xaxis: { 
      gridcolor: '#444',
      title: 'Precio ($)',
    },
    yaxis: { 
      gridcolor: '#444',
      title: 'Frecuencia',
    },
    bargap: 0.05,
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