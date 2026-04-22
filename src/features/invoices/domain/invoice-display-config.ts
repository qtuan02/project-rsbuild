import { CheckCircle2, Clock, AlertCircle, Ban } from "lucide-react";

import type { InvoiceStatus } from "@/types/invoice";

import type { LucideIcon } from "lucide-react";

export const invoiceStatusConfig: Record<
  InvoiceStatus,
  {
    label: string;
    variant: "outline" | "default" | "secondary";
    icon: LucideIcon;
    className: string;
  }
> = {
  paid: {
    label: "Đã thanh toán",
    variant: "default",
    icon: CheckCircle2,
    className:
      "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800",
  },
  pending: {
    label: "Chờ thanh toán",
    variant: "secondary",
    icon: Clock,
    className:
      "border-blue-300 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  },
  overdue: {
    label: "Quá hạn",
    variant: "secondary",
    icon: AlertCircle,
    className:
      "border-red-300 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
  },
  cancelled: {
    label: "Đã hủy",
    variant: "outline",
    icon: Ban,
    className:
      "border-slate-300 bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:border-slate-800",
  },
};

export const statusFilterOptions: {
  label: string;
  value: InvoiceStatus;
  icon: LucideIcon;
}[] = [
  { label: "Đã thanh toán", value: "paid", icon: CheckCircle2 },
  { label: "Chờ thanh toán", value: "pending", icon: Clock },
  { label: "Quá hạn", value: "overdue", icon: AlertCircle },
  { label: "Đã hủy", value: "cancelled", icon: Ban },
];
