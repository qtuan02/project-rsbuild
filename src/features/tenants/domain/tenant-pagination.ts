import type { Tenant } from '@/types/tenant';

export const getTotalPages = (itemsCount: number, pageSize: number): number => {
  return Math.max(1, Math.ceil(itemsCount / pageSize));
};

export const getSafeCurrentPage = (
  currentPage: number,
  totalPages: number,
): number => {
  return Math.min(currentPage, totalPages);
};

export const paginateTenants = (
  tenants: Tenant[],
  currentPage: number,
  pageSize: number,
): Tenant[] => {
  const start = (currentPage - 1) * pageSize;
  return tenants.slice(start, start + pageSize);
};
