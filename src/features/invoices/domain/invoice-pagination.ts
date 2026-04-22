import type { Invoice } from "@/types/invoice";

export const getTotalPages = (
  filteredCount: number,
  pageSize: number,
): number => {
  return Math.ceil(filteredCount / pageSize);
};

export const getSafeCurrentPage = (
  currentPage: number,
  totalPages: number,
): number => {
  if (totalPages === 0) return 1;
  return Math.min(Math.max(1, currentPage), totalPages);
};

export const paginateInvoices = (
  invoices: Invoice[],
  currentPage: number,
  pageSize: number,
): Invoice[] => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return invoices.slice(startIndex, endIndex);
};
