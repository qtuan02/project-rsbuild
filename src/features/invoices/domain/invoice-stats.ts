import type { Invoice } from "@/types/invoice";

export interface InvoiceSummaryStats {
  total: number;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  overdueAmount: number;
}

export const buildInvoiceSummaryStats = (
  invoices: Invoice[],
): InvoiceSummaryStats => {
  const stats: InvoiceSummaryStats = {
    total: invoices.length,
    totalAmount: 0,
    paidAmount: 0,
    pendingAmount: 0,
    overdueAmount: 0,
  };

  invoices.forEach((invoice) => {
    stats.totalAmount += invoice.amount;

    if (invoice.status === "paid") {
      stats.paidAmount += invoice.amount;
    } else if (invoice.status === "pending") {
      stats.pendingAmount += invoice.amount;
    } else if (invoice.status === "overdue") {
      stats.overdueAmount += invoice.amount;
    }
  });

  return stats;
};
