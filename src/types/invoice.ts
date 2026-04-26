export type InvoiceStatus = "paid" | "pending" | "overdue" | "cancelled";

export const INVOICE_STATUSES = [
  "paid",
  "pending",
  "overdue",
  "cancelled",
] as const;

export interface Invoice {
  id: string;
  buildingId?: string;
  invoiceNumber: string;
  tenant: string;
  room: string;
  floor: number;
  amount: number;
  month: string;
  dueDate: string;
  status: InvoiceStatus;
  paymentDate: string | null;
  lastUpdated: string;
}

export interface InvoiceStatusConfigItem {
  label: string;
  className: string;
}

export type InvoiceStatusConfig = Record<
  InvoiceStatus,
  InvoiceStatusConfigItem
>;

export const isInvoiceStatus = (value: string): value is InvoiceStatus =>
  INVOICE_STATUSES.includes(value as InvoiceStatus);
