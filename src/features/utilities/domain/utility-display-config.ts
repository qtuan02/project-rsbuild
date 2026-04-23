import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

import type { UtilityStatus, UtilityType } from "@/types/utility";

import type { ComponentType } from "react";

interface StatusConfig {
  label: string;
  value: UtilityStatus;
  badgeColor: string;
  icon: ComponentType<{ className?: string }>;
}

interface TypeConfig {
  label: string;
  value: UtilityType;
  icon: ComponentType<{ className?: string }>;
}

export const utilityStatusConfig: Record<UtilityStatus, StatusConfig> = {
  draft: {
    label: "Nháp",
    value: "draft",
    badgeColor:
      "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
    icon: Clock,
  },
  verified: {
    label: "Đã xác minh",
    value: "verified",
    badgeColor:
      "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200",
    icon: CheckCircle2,
  },
  anomaly: {
    label: "Bất thường",
    value: "anomaly",
    badgeColor: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200",
    icon: AlertCircle,
  },
};

export const utilityTypeConfig: Record<UtilityType, TypeConfig> = {
  electricity: {
    label: "Điện",
    value: "electricity",
    icon: Clock,
  },
  water: {
    label: "Nước",
    value: "water",
    icon: Clock,
  },
};

export const statusFilterOptions = Object.values(utilityStatusConfig).map(
  (config) => ({
    label: config.label,
    value: config.value,
    icon: config.icon,
  }),
);

export const typeFilterOptions = Object.values(utilityTypeConfig).map(
  (config) => ({
    label: config.label,
    value: config.value,
  }),
);
