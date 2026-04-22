import type { Invoice, InvoiceStatus } from "@/types/invoice";

import { isMonthFilter, type MonthFilter } from "./invoice-filter-params";

export interface InvoiceFiltersState {
  search: string;
  statusFilter: InvoiceStatus[];
  monthFilter: MonthFilter[];
}

export const filterInvoices = (
  invoices: Invoice[],
  filters: InvoiceFiltersState,
): Invoice[] => {
  return invoices.filter((invoice) => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        invoice.invoiceNumber.toLowerCase().includes(searchLower) ||
        invoice.tenant.toLowerCase().includes(searchLower) ||
        invoice.room.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Status filter
    if (filters.statusFilter.length > 0) {
      if (!filters.statusFilter.includes(invoice.status)) {
        return false;
      }
    }

    // Month filter
    if (filters.monthFilter.length > 0) {
      if (
        !isMonthFilter(invoice.month) ||
        !filters.monthFilter.includes(invoice.month)
      ) {
        return false;
      }
    }

    return true;
  });
};

export const countActiveInvoiceFilters = (
  filters: InvoiceFiltersState,
): number => {
  let count = 0;
  if (filters.search) count++;
  if (filters.statusFilter.length > 0) count++;
  if (filters.monthFilter.length > 0) count++;
  return count;
};
