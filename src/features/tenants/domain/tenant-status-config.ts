import { getStatusClassName } from "@/config/colors";
import type { TenantStatusConfig } from "@/types/tenant";

export const tenantStatusConfig: TenantStatusConfig = {
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
