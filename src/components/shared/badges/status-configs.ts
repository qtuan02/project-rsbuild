import {
  AlertCircle,
  Ban,
  CheckCircle2,
  Circle,
  Clock,
  Wrench,
  XCircle,
} from "lucide-react";

import { getStatusClassName } from "@/config/colors";
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
    className: getStatusClassName("success"),
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
    className: getStatusClassName("warning"),
  },
  reserved: {
    label: "Đã đặt",
    variant: "secondary",
    icon: Clock,
    className: getStatusClassName("info"),
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
    className: getStatusClassName("success"),
  },
  pending: {
    label: "Chờ thanh toán",
    className: getStatusClassName("info"),
  },
  overdue: {
    label: "Quá hạn",
    className: getStatusClassName("error"),
  },
  cancelled: {
    label: "Đã hủy",
    className: getStatusClassName("neutral2"),
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
    className: getStatusClassName("success"),
  },
  ending: {
    label: "Sắp hết hạn",
    className: getStatusClassName("warning"),
  },
  ended: {
    label: "Đã hết hạn",
    className: getStatusClassName("neutral2"),
  },
  pending: {
    label: "Chờ xử lý",
    className: getStatusClassName("info"),
  },
};

export const tenantStatusBadgeConfig: TenantStatusConfig = {
  active: {
    label: "Đang thuê",
    className: getStatusClassName("success"),
  },
  pending: {
    label: "Chờ vào",
    className: getStatusClassName("info"),
  },
  overdue: {
    label: "Nợ cước",
    className: getStatusClassName("error"),
  },
  ended: {
    label: "Đã trả",
    className: getStatusClassName("neutral"),
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
