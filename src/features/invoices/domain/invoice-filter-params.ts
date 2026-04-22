import type { InvoiceStatus } from "@/types/invoice";

export type MonthFilter = string;

export const toInvoiceStatuses = (
  value: unknown,
): InvoiceStatus[] | undefined => {
  if (!value) return undefined;
  if (Array.isArray(value)) {
    const filtered = value.filter((v) => typeof v === "string");
    return filtered.length > 0 ? (filtered as InvoiceStatus[]) : undefined;
  }
  if (typeof value === "string") {
    return [value as InvoiceStatus];
  }
  return undefined;
};

export const toMonthFilters = (value: unknown): MonthFilter[] | undefined => {
  if (!value) return undefined;
  if (Array.isArray(value)) {
    const filtered = value.filter((v) => typeof v === "string");
    return filtered.length > 0 ? (filtered as MonthFilter[]) : undefined;
  }
  if (typeof value === "string") {
    return [value];
  }
  return undefined;
};

export const getMonthOptions = () => [
  { label: "04/2026", value: "04/2026" },
  { label: "03/2026", value: "03/2026" },
  { label: "02/2026", value: "02/2026" },
  { label: "01/2026", value: "01/2026" },
  { label: "12/2025", value: "12/2025" },
];
