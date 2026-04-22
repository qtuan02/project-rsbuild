import { isInvoiceStatus, type InvoiceStatus } from "@/types/invoice";

const MONTH_FILTER_OPTIONS = [
  { label: "04/2026", value: "04/2026" },
  { label: "03/2026", value: "03/2026" },
  { label: "02/2026", value: "02/2026" },
  { label: "01/2026", value: "01/2026" },
  { label: "12/2025", value: "12/2025" },
] as const;

export type MonthFilter = (typeof MONTH_FILTER_OPTIONS)[number]["value"];

const monthFilterSet = new Set<string>(
  MONTH_FILTER_OPTIONS.map((o) => o.value),
);

export const isMonthFilter = (value: string): value is MonthFilter =>
  monthFilterSet.has(value);

export const toInvoiceStatuses = (
  value: unknown,
): InvoiceStatus[] | undefined => {
  if (!value) return undefined;
  if (Array.isArray(value)) {
    const filtered = value.filter(
      (item): item is InvoiceStatus =>
        typeof item === "string" && isInvoiceStatus(item),
    );
    return filtered.length > 0 ? filtered : undefined;
  }
  if (typeof value === "string" && isInvoiceStatus(value)) {
    return [value];
  }
  return undefined;
};

export const toMonthFilters = (value: unknown): MonthFilter[] | undefined => {
  if (!value) return undefined;
  if (Array.isArray(value)) {
    const filtered = value.filter(
      (item): item is MonthFilter =>
        typeof item === "string" && isMonthFilter(item),
    );
    return filtered.length > 0 ? filtered : undefined;
  }
  if (typeof value === "string" && isMonthFilter(value)) {
    return [value];
  }
  return undefined;
};

export const getMonthOptions =
  (): readonly (typeof MONTH_FILTER_OPTIONS)[number][] => MONTH_FILTER_OPTIONS;
