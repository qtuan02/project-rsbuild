import * as React from "react";

import type { InvoiceStatus } from "@/types/invoice";

import { getInvoices } from "../data/invoice.repository";
import {
  toInvoiceStatuses,
  toMonthFilters,
  type MonthFilter,
} from "../domain/invoice-filter-params";
import {
  countActiveInvoiceFilters,
  filterInvoices,
  type InvoiceFiltersState,
} from "../domain/invoice-filters";
import {
  getSafeCurrentPage,
  getTotalPages,
  paginateInvoices,
} from "../domain/invoice-pagination";
import { buildInvoiceSummaryStats } from "../domain/invoice-stats";

const DEFAULT_PAGE_SIZE = 6;

export interface UseInvoiceListResult {
  search: string;
  statusFilter: InvoiceStatus[];
  monthFilter: MonthFilter[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  activeFilterCount: number;
  filteredCount: number;
  paginatedInvoices: ReturnType<typeof getInvoices>;
  summaryStats: ReturnType<typeof buildInvoiceSummaryStats>;
  onSearchChange: (value: string) => void;
  onStatusFilterValueChange: (value: unknown) => void;
  onMonthFilterValueChange: (value: unknown) => void;
  onPageChange: (value: number) => void;
  onPageSizeChange: (value: number) => void;
  clearFilters: () => void;
}

export const useInvoiceList = (): UseInvoiceListResult => {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<InvoiceStatus[]>([]);
  const [monthFilter, setMonthFilter] = React.useState<MonthFilter[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(DEFAULT_PAGE_SIZE);

  const invoices = React.useMemo(() => getInvoices(), []);

  const filters = React.useMemo<InvoiceFiltersState>(
    () => ({
      search,
      statusFilter,
      monthFilter,
    }),
    [search, statusFilter, monthFilter],
  );

  const filteredInvoices = React.useMemo(
    () => filterInvoices(invoices, filters),
    [filters, invoices],
  );

  const totalPages = React.useMemo(
    () => getTotalPages(filteredInvoices.length, pageSize),
    [filteredInvoices.length, pageSize],
  );

  const safeCurrentPage = React.useMemo(
    () => getSafeCurrentPage(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const paginatedInvoices = React.useMemo(
    () => paginateInvoices(filteredInvoices, safeCurrentPage, pageSize),
    [filteredInvoices, pageSize, safeCurrentPage],
  );

  const summaryStats = React.useMemo(
    () => buildInvoiceSummaryStats(invoices),
    [invoices],
  );

  const activeFilterCount = React.useMemo(
    () => countActiveInvoiceFilters(filters),
    [filters],
  );

  const onSearchChange = React.useCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);

  const onPageSizeChange = React.useCallback((value: number) => {
    setPageSize(value);
    setCurrentPage(1);
  }, []);

  const onStatusFilterValueChange = React.useCallback((value: unknown) => {
    setStatusFilter(toInvoiceStatuses(value) ?? []);
    setCurrentPage(1);
  }, []);

  const onMonthFilterValueChange = React.useCallback((value: unknown) => {
    setMonthFilter(toMonthFilters(value) ?? []);
    setCurrentPage(1);
  }, []);

  const clearFilters = React.useCallback(() => {
    setSearch("");
    setStatusFilter([]);
    setMonthFilter([]);
    setCurrentPage(1);
  }, []);

  return {
    search,
    statusFilter,
    monthFilter,
    currentPage: safeCurrentPage,
    pageSize,
    totalPages,
    activeFilterCount,
    filteredCount: filteredInvoices.length,
    paginatedInvoices,
    summaryStats,
    onSearchChange,
    onStatusFilterValueChange,
    onMonthFilterValueChange,
    onPageChange: setCurrentPage,
    onPageSizeChange,
    clearFilters,
  };
};
