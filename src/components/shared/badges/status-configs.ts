import {
  AlertCircle,
  Ban,
  CheckCircle2,
  Circle,
  Clock,
  Wrench,
  XCircle,
} from "lucide-react";

import { STATUS_COLORS } from "@/config/colors";
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
    className: `${STATUS_COLORS.success.light.border} ${STATUS_COLORS.success.light.bg} ${STATUS_COLORS.success.light.text} ${STATUS_COLORS.success.dark.bg} ${STATUS_COLORS.success.dark.text} ${STATUS_COLORS.success.dark.border}`,
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
    className: `${STATUS_COLORS.warning.light.border} ${STATUS_COLORS.warning.light.bg} ${STATUS_COLORS.warning.light.text} ${STATUS_COLORS.warning.dark.bg} ${STATUS_COLORS.warning.dark.text} ${STATUS_COLORS.warning.dark.border}`,
  },
  reserved: {
    label: "Đã đặt",
    variant: "secondary",
    icon: Clock,
    className: `${STATUS_COLORS.info.light.border} ${STATUS_COLORS.info.light.bg} ${STATUS_COLORS.info.light.text} ${STATUS_COLORS.info.dark.bg} ${STATUS_COLORS.info.dark.text} ${STATUS_COLORS.info.dark.border}`,
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
    className: `${STATUS_COLORS.success.light.bg} ${STATUS_COLORS.success.dark.bg} ${STATUS_COLORS.success.light.text} ${STATUS_COLORS.success.dark.text} ${STATUS_COLORS.success.light.border} ${STATUS_COLORS.success.dark.border}`,
  },
  pending: {
    label: "Chờ thanh toán",
    className: `${STATUS_COLORS.info.light.border} ${STATUS_COLORS.info.light.bg} ${STATUS_COLORS.info.light.text} ${STATUS_COLORS.info.dark.bg} ${STATUS_COLORS.info.dark.text} ${STATUS_COLORS.info.dark.border}`,
  },
  overdue: {
    label: "Quá hạn",
    className: `${STATUS_COLORS.error.light.border} ${STATUS_COLORS.error.light.bg} ${STATUS_COLORS.error.light.text} ${STATUS_COLORS.error.dark.bg} ${STATUS_COLORS.error.dark.text} ${STATUS_COLORS.error.dark.border}`,
  },
  cancelled: {
    label: "Đã hủy",
    className: `${STATUS_COLORS.neutral2.light.border} ${STATUS_COLORS.neutral2.light.bg} ${STATUS_COLORS.neutral2.light.text} ${STATUS_COLORS.neutral2.dark.bg} ${STATUS_COLORS.neutral2.dark.text} ${STATUS_COLORS.neutral2.dark.border}`,
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
    className: `${STATUS_COLORS.success.light.bg} ${STATUS_COLORS.success.dark.bg} ${STATUS_COLORS.success.light.text} ${STATUS_COLORS.success.dark.text} ${STATUS_COLORS.success.light.border} ${STATUS_COLORS.success.dark.border}`,
  },
  ending: {
    label: "Sắp hết hạn",
    className: `${STATUS_COLORS.warning.light.border} ${STATUS_COLORS.warning.light.bg} ${STATUS_COLORS.warning.light.text} ${STATUS_COLORS.warning.dark.bg} ${STATUS_COLORS.warning.dark.text} ${STATUS_COLORS.warning.dark.border}`,
  },
  ended: {
    label: "Đã hết hạn",
    className: `${STATUS_COLORS.neutral2.light.border} ${STATUS_COLORS.neutral2.light.bg} ${STATUS_COLORS.neutral2.light.text} ${STATUS_COLORS.neutral2.dark.bg} ${STATUS_COLORS.neutral2.dark.text} ${STATUS_COLORS.neutral2.dark.border}`,
  },
  pending: {
    label: "Chờ xử lý",
    className: `${STATUS_COLORS.info.light.border} ${STATUS_COLORS.info.light.bg} ${STATUS_COLORS.info.light.text} ${STATUS_COLORS.info.dark.bg} ${STATUS_COLORS.info.dark.text} ${STATUS_COLORS.info.dark.border}`,
  },
};

export const tenantStatusBadgeConfig: TenantStatusConfig = {
  active: {
    label: "Đang thuê",
    className: `${STATUS_COLORS.success.light.border} ${STATUS_COLORS.success.light.bg} ${STATUS_COLORS.success.light.text} ${STATUS_COLORS.success.dark.bg} ${STATUS_COLORS.success.dark.text} ${STATUS_COLORS.success.dark.border}`,
  },
  pending: {
    label: "Chờ vào",
    className: `${STATUS_COLORS.info.light.border} ${STATUS_COLORS.info.light.bg} ${STATUS_COLORS.info.light.text} ${STATUS_COLORS.info.dark.bg} ${STATUS_COLORS.info.dark.text} ${STATUS_COLORS.info.dark.border}`,
  },
  overdue: {
    label: "Nợ cước",
    className: `${STATUS_COLORS.error.light.border} ${STATUS_COLORS.error.light.bg} ${STATUS_COLORS.error.light.text} ${STATUS_COLORS.error.dark.bg} ${STATUS_COLORS.error.dark.text} ${STATUS_COLORS.error.dark.border}`,
  },
  ended: {
    label: "Đã trả",
    className: `${STATUS_COLORS.neutral.light.border} ${STATUS_COLORS.neutral.light.bg} ${STATUS_COLORS.neutral.light.text} ${STATUS_COLORS.neutral.dark.bg} ${STATUS_COLORS.neutral.dark.text} ${STATUS_COLORS.neutral.dark.border}`,
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
