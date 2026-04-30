import { CheckCircle2, Clock, AlertCircle, XCircle } from "lucide-react";

import { getStatusClassName } from "@/config/colors";
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
    className: getStatusClassName("success"),
  },
  ending: {
    label: "Sắp hết hạn",
    variant: "secondary",
    icon: AlertCircle,
    className: getStatusClassName("warning"),
  },
  ended: {
    label: "Đã hết hạn",
    variant: "outline",
    icon: XCircle,
    className: getStatusClassName("neutral2"),
  },
  pending: {
    label: "Chờ xử lý",
    variant: "secondary",
    icon: Clock,
    className: getStatusClassName("info"),
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
