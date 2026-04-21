import type { Tenant, TenantStatus } from '@/types/tenant';

import type { FloorFilter } from './tenant-filter-params';

export interface TenantFiltersState {
  search: string;
  statusFilter: TenantStatus[];
  floorFilter: FloorFilter[];
}

const normalizePhone = (value: string): string => value.replace(/\s/g, '');

const matchesSearch = (tenant: Tenant, query: string): boolean => {
  const normalizedQuery = query.toLowerCase();
  const normalizedPhoneQuery = normalizePhone(query);

  return (
    tenant.name.toLowerCase().includes(normalizedQuery) ||
    normalizePhone(tenant.phone).includes(normalizedPhoneQuery) ||
    tenant.email.toLowerCase().includes(normalizedQuery) ||
    tenant.room.toLowerCase().includes(normalizedQuery)
  );
};

export const filterTenants = (
  tenants: Tenant[],
  filters: TenantFiltersState,
): Tenant[] => {
  return tenants.filter((tenant) => {
    if (filters.search && !matchesSearch(tenant, filters.search)) {
      return false;
    }

    if (
      filters.statusFilter.length > 0 &&
      !filters.statusFilter.includes(tenant.status)
    ) {
      return false;
    }

    if (
      filters.floorFilter.length > 0 &&
      !filters.floorFilter.includes(String(tenant.floor) as FloorFilter)
    ) {
      return false;
    }

    return true;
  });
};

export const countActiveTenantFilters = (
  filters: TenantFiltersState,
): number => {
  return (
    (filters.search ? 1 : 0) +
    (filters.statusFilter.length > 0 ? 1 : 0) +
    (filters.floorFilter.length > 0 ? 1 : 0)
  );
};
