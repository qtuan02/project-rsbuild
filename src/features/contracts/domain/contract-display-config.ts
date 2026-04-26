import { CheckCircle2, Clock, AlertCircle, XCircle } from "lucide-react";

import { STATUS_COLORS } from "@/config/colors";
import type { ContractStatus } from "@/types/contract";

import type { LucideIcon } from "lucide-react";

export const contractStatusConfig: Record<
  ContractStatus,
  {
    label: string;
    variant: "outline" | "default" | "secondary";
    icon: LucideIcon;
    className: string;
  }
> = {
  active: {
    label: "Đang hoạt động",
    variant: "default",
    icon: CheckCircle2,
    className: `${STATUS_COLORS.success.light.bg} ${STATUS_COLORS.success.dark.bg} ${STATUS_COLORS.success.light.text} ${STATUS_COLORS.success.dark.text} ${STATUS_COLORS.success.light.border} ${STATUS_COLORS.success.dark.border}`,
  },
  ending: {
    label: "Sắp hết hạn",
    variant: "secondary",
    icon: AlertCircle,
    className: `${STATUS_COLORS.warning.light.border} ${STATUS_COLORS.warning.light.bg} ${STATUS_COLORS.warning.light.text} ${STATUS_COLORS.warning.dark.bg} ${STATUS_COLORS.warning.dark.text} ${STATUS_COLORS.warning.dark.border}`,
  },
  ended: {
    label: "Đã hết hạn",
    variant: "outline",
    icon: XCircle,
    className: `${STATUS_COLORS.neutral2.light.border} ${STATUS_COLORS.neutral2.light.bg} ${STATUS_COLORS.neutral2.light.text} ${STATUS_COLORS.neutral2.dark.bg} ${STATUS_COLORS.neutral2.dark.text} ${STATUS_COLORS.neutral2.dark.border}`,
  },
  pending: {
    label: "Chờ xử lý",
    variant: "secondary",
    icon: Clock,
    className: `${STATUS_COLORS.info.light.border} ${STATUS_COLORS.info.light.bg} ${STATUS_COLORS.info.light.text} ${STATUS_COLORS.info.dark.bg} ${STATUS_COLORS.info.dark.text} ${STATUS_COLORS.info.dark.border}`,
  },
};

export const statusFilterOptions: {
  label: string;
  value: ContractStatus;
  icon: LucideIcon;
}[] = [
  { label: "Đang hoạt động", value: "active", icon: CheckCircle2 },
  { label: "Sắp hết hạn", value: "ending", icon: AlertCircle },
  { label: "Đã hết hạn", value: "ended", icon: XCircle },
  { label: "Chờ xử lý", value: "pending", icon: Clock },
];
