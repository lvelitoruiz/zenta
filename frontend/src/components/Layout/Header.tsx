'use client';
import React from 'react';
import { useOrganizations } from '@/hooks/useOrganizations';
import { useOrganizationStore } from '@/store/organizationStore';
import { ErrorState } from '../ui/error-state';
import { Loader } from '../ui/loader';

export const Header = () => {
  const { organizations, loading, error } = useOrganizations();
  const { selectedOrganizationId, setSelectedOrganizationId } = useOrganizationStore();

  if (error) {
    return (
      <header className="bg-gray-900 text-white p-4">
        <ErrorState message={error} />
      </header>
    );
  }

  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          {loading ? (
            <Loader />
          ) : (
            <select
              className="bg-gray-800 text-white px-3 py-2 rounded-lg"
              value={selectedOrganizationId || ''}
              onChange={(e) => setSelectedOrganizationId(Number(e.target.value))}
            >
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </header>
  );
}; 