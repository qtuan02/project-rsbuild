import { CheckCircle2, Clock, AlertCircle, XCircle } from "lucide-react";

import type { ContractStatus } from "@/types/contract";

export const contractStatusConfig: Record<
  ContractStatus,
  {
    label: string;
    variant: "outline" | "default" | "secondary";
    icon: typeof CheckCircle2;
    className: string;
  }
> = {
  active: {
    label: "Đang hoạt động",
    variant: "default",
    icon: CheckCircle2,
    className: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800",
  },
  ending: {
    label: "Sắp hết hạn",
    variant: "secondary",
    icon: AlertCircle,
    className: "border-amber-300 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  },
  ended: {
    label: "Đã hết hạn",
    variant: "outline",
    icon: XCircle,
    className: "border-slate-300 bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:border-slate-800",
  },
  pending: {
    label: "Chờ xử lý",
    variant: "secondary",
    icon: Clock,
    className: "border-blue-300 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  },
};

export const statusFilterOptions = [
  { label: "Đang hoạt động", value: "active", icon: CheckCircle2 },
  { label: "Sắp hết hạn", value: "ending", icon: AlertCircle },
  { label: "Đã hết hạn", value: "ended", icon: XCircle },
  { label: "Chờ xử lý", value: "pending", icon: Clock },
];
