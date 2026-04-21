import * as React from 'react';

import type { TenantStatus } from '@/types/tenant';

import { getTenants } from '../data/tenant.repository';
import {
  countActiveTenantFilters,
  filterTenants,
  type TenantFiltersState,
} from '../domain/tenant-filters';
import {
  getSafeCurrentPage,
  getTotalPages,
  paginateTenants,
} from '../domain/tenant-pagination';
import { buildTenantSummaryStats } from '../domain/tenant-stats';

import type { FloorFilter } from '../domain/tenant-filter-params';

const DEFAULT_PAGE_SIZE = 6;

export interface UseTenantListResult {
  search: string;
  statusFilter: TenantStatus[];
  floorFilter: FloorFilter[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  activeFilterCount: number;
  filteredCount: number;
  paginatedTenants: ReturnType<typeof getTenants>;
  summaryStats: ReturnType<typeof buildTenantSummaryStats>;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: TenantStatus[] | undefined) => void;
  onFloorFilterChange: (value: FloorFilter[] | undefined) => void;
  onPageChange: (value: number) => void;
  onPageSizeChange: (value: number) => void;
  clearFilters: () => void;
}

export const useTenantList = (): UseTenantListResult => {
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<TenantStatus[]>([]);
  const [floorFilter, setFloorFilter] = React.useState<FloorFilter[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(DEFAULT_PAGE_SIZE);

  const tenants = React.useMemo(() => getTenants(), []);

  const filters = React.useMemo<TenantFiltersState>(
    () => ({
      search,
      statusFilter,
      floorFilter,
    }),
    [search, statusFilter, floorFilter],
  );

  const filteredTenants = React.useMemo(
    () => filterTenants(tenants, filters),
    [filters, tenants],
  );

  const totalPages = React.useMemo(
    () => getTotalPages(filteredTenants.length, pageSize),
    [filteredTenants.length, pageSize],
  );

  const safeCurrentPage = React.useMemo(
    () => getSafeCurrentPage(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const paginatedTenants = React.useMemo(
    () => paginateTenants(filteredTenants, safeCurrentPage, pageSize),
    [filteredTenants, pageSize, safeCurrentPage],
  );

  const summaryStats = React.useMemo(
    () => buildTenantSummaryStats(tenants),
    [tenants],
  );

  const activeFilterCount = React.useMemo(
    () => countActiveTenantFilters(filters),
    [filters],
  );

  const onSearchChange = React.useCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);

  const onStatusFilterChange = React.useCallback(
    (value: TenantStatus[] | undefined) => {
      setStatusFilter(value ?? []);
      setCurrentPage(1);
    },
    [],
  );

  const onFloorFilterChange = React.useCallback(
    (value: FloorFilter[] | undefined) => {
      setFloorFilter(value ?? []);
      setCurrentPage(1);
    },
    [],
  );

  const onPageSizeChange = React.useCallback((value: number) => {
    setPageSize(value);
    setCurrentPage(1);
  }, []);

  const clearFilters = React.useCallback(() => {
    setSearch('');
    setStatusFilter([]);
    setFloorFilter([]);
    setCurrentPage(1);
  }, []);

  return {
    search,
    statusFilter,
    floorFilter,
    currentPage: safeCurrentPage,
    pageSize,
    totalPages,
    activeFilterCount,
    filteredCount: filteredTenants.length,
    paginatedTenants,
    summaryStats,
    onSearchChange,
    onStatusFilterChange,
    onFloorFilterChange,
    onPageChange: setCurrentPage,
    onPageSizeChange,
    clearFilters,
  };
};
