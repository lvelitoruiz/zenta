import { useState, useEffect } from 'react';
import { useOrganizationStore } from '@/store/organizationStore';

interface Organization {
  id: number;
  name: string;
}

export const useOrganizations = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setSelectedOrganizationId } = useOrganizationStore();

  useEffect(() => {
    const fetchOrganizations = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/organizations`);
        
        if (!response.ok) {
          throw new Error('Error al obtener las organizaciones');
        }
        
        const data = await response.json();
        setOrganizations(data);
        
        if (data.length > 0) {
          setSelectedOrganizationId(data[0].id);
        }
      } catch (error) {
        console.error('Error fetching organizations:', error);
        setError('Error al cargar las organizaciones');
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, [setSelectedOrganizationId]);

  return { organizations, loading, error };
}; 