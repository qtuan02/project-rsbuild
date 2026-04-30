import { CheckCircle2, Clock, AlertCircle, Ban } from "lucide-react";

import { getStatusClassName } from "@/config/colors";
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
    className: getStatusClassName("success"),
  },
  pending: {
    label: "Chờ thanh toán",
    variant: "secondary",
    icon: Clock,
    className: getStatusClassName("info"),
  },
  overdue: {
    label: "Quá hạn",
    variant: "secondary",
    icon: AlertCircle,
    className: getStatusClassName("error"),
  },
  cancelled: {
    label: "Đã hủy",
    variant: "outline",
    icon: Ban,
    className: getStatusClassName("neutral2"),
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
