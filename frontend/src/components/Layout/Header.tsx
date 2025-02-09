'use client';
import { useEffect } from 'react';
import { useOrganizationStore } from '@/store/organizationStore';

export const Header = () => {
  const { 
    organizations, 
    selectedOrganizationId, 
    setOrganizations, 
    setSelectedOrganizationId 
  } = useOrganizationStore();

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/organizations`);
        const data = await response.json();
        setOrganizations(data);
        if (!selectedOrganizationId && data.length > 0) {
          setSelectedOrganizationId(data[0].id);
        }
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, []);

  return (
    <header className="w-full bg-gray-950 border-b border-gray-800 mb-6 z-10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="text-2xl font-bold text-white">ZENTA</div>
        <select 
          className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedOrganizationId || ''}
          onChange={(e) => setSelectedOrganizationId(Number(e.target.value))}
        >
          <option value="">Selecciona una compañía</option>
          {organizations.map((org) => (
            <option key={org.id} value={org.id}>
              {org.name}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}; 