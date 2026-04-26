import { CheckCircle2, Clock, AlertCircle, Ban } from "lucide-react";

import { STATUS_COLORS } from "@/config/colors";
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
    className: `${STATUS_COLORS.success.light.bg} ${STATUS_COLORS.success.dark.bg} ${STATUS_COLORS.success.light.text} ${STATUS_COLORS.success.dark.text} ${STATUS_COLORS.success.light.border} ${STATUS_COLORS.success.dark.border}`,
  },
  pending: {
    label: "Chờ thanh toán",
    variant: "secondary",
    icon: Clock,
    className: `${STATUS_COLORS.info.light.border} ${STATUS_COLORS.info.light.bg} ${STATUS_COLORS.info.light.text} ${STATUS_COLORS.info.dark.bg} ${STATUS_COLORS.info.dark.text} ${STATUS_COLORS.info.dark.border}`,
  },
  overdue: {
    label: "Quá hạn",
    variant: "secondary",
    icon: AlertCircle,
    className: `${STATUS_COLORS.error.light.border} ${STATUS_COLORS.error.light.bg} ${STATUS_COLORS.error.light.text} ${STATUS_COLORS.error.dark.bg} ${STATUS_COLORS.error.dark.text} ${STATUS_COLORS.error.dark.border}`,
  },
  cancelled: {
    label: "Đã hủy",
    variant: "outline",
    icon: Ban,
    className: `${STATUS_COLORS.neutral2.light.border} ${STATUS_COLORS.neutral2.light.bg} ${STATUS_COLORS.neutral2.light.text} ${STATUS_COLORS.neutral2.dark.bg} ${STATUS_COLORS.neutral2.dark.text} ${STATUS_COLORS.neutral2.dark.border}`,
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
