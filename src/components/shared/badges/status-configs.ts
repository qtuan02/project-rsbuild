import {
  AlertCircle,
  Ban,
  CheckCircle2,
  Circle,
  Clock,
  Wrench,
  XCircle,
} from "lucide-react";

import type { ContractStatus } from "@/types/contract";
import type { InvoiceStatus } from "@/types/invoice";
import type { RoomStatus } from "@/types/room";
import type { TenantStatusConfig } from "@/types/tenant";

export const roomStatusBadgeConfig: Record<
  RoomStatus,
  {
    label: string;
    variant: "outline" | "default" | "secondary";
    icon: typeof Circle;
    className: string;
  }
> = {
  available: {
    label: "Trống",
    variant: "outline",
    icon: Circle,
    className:
      "border-emerald-300 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  },
  occupied: {
    label: "Đã thuê",
    variant: "default",
    icon: CheckCircle2,
    className: "bg-primary/10 text-primary border-primary/20",
  },
  maintenance: {
    label: "Bảo trì",
    variant: "secondary",
    icon: Wrench,
    className:
      "border-amber-300 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  },
  reserved: {
    label: "Đã đặt",
    variant: "secondary",
    icon: Clock,
    className:
      "border-blue-300 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  },
};

export const invoiceStatusBadgeConfig: Record<
  InvoiceStatus,
  {
    label: string;
    className: string;
  }
> = {
  paid: {
    label: "Đã thanh toán",
    className:
      "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800",
  },
  pending: {
    label: "Chờ thanh toán",
    className:
      "border-blue-300 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  },
  overdue: {
    label: "Quá hạn",
    className:
      "border-red-300 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
  },
  cancelled: {
    label: "Đã hủy",
    className:
      "border-slate-300 bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:border-slate-800",
  },
};

export const contractStatusBadgeConfig: Record<
  ContractStatus,
  {
    label: string;
    className: string;
  }
> = {
  active: {
    label: "Đang hoạt động",
    className:
      "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800",
  },
  ending: {
    label: "Sắp hết hạn",
    className:
      "border-amber-300 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  },
  ended: {
    label: "Đã hết hạn",
    className:
      "border-slate-300 bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:border-slate-800",
  },
  pending: {
    label: "Chờ xử lý",
    className:
      "border-blue-300 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  },
};

export const tenantStatusBadgeConfig: TenantStatusConfig = {
  active: {
    label: "Đang thuê",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
  },
  pending: {
    label: "Chờ vào",
    className:
      "border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
  },
  overdue: {
    label: "Nợ cước",
    className:
      "border-red-200 bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800",
  },
  ended: {
    label: "Đã trả",
    className:
      "border-zinc-200 bg-zinc-50 text-zinc-500 dark:bg-zinc-900/50 dark:text-zinc-400 dark:border-zinc-700",
  },
};

export const invoiceStatusFilterIconMap = {
  paid: CheckCircle2,
  pending: Clock,
  overdue: AlertCircle,
  cancelled: Ban,
} as const;

export const contractStatusFilterIconMap = {
  active: CheckCircle2,
  ending: AlertCircle,
  ended: XCircle,
  pending: Clock,
} as const;
