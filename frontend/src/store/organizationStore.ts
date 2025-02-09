import { create } from 'zustand';

interface Organization {
  id: number;
  name: string;
}

interface OrganizationStore {
  organizations: Organization[];
  selectedOrganizationId: number | null;
  setOrganizations: (organizations: Organization[]) => void;
  setSelectedOrganizationId: (id: number) => void;
}

export const useOrganizationStore = create<OrganizationStore>((set) => ({
  organizations: [],
  selectedOrganizationId: null,
  setOrganizations: (organizations) => set({ organizations }),
  setSelectedOrganizationId: (id) => set({ selectedOrganizationId: id }),
})); 