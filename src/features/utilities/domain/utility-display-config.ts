import type { UtilityStatus, UtilityType } from "@/types/utility";

interface StatusConfig {
  label: string;
  value: UtilityStatus;
  className: string;
}

interface TypeConfig {
  label: string;
  value: UtilityType;
  color: string;
  bgColor: string;
  accentColor: string;
}

export const utilityStatusConfig: Record<UtilityStatus, StatusConfig> = {
  draft: {
    label: "Nháp",
    value: "draft",
    className:
      "border-zinc-200 bg-zinc-50 text-zinc-500 dark:bg-zinc-900/50 dark:text-zinc-400 dark:border-zinc-700",
  },
  verified: {
    label: "Đã xác minh",
    value: "verified",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
  },
  anomaly: {
    label: "Bất thường",
    value: "anomaly",
    className:
      "border-red-200 bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800",
  },
};

export const utilityTypeConfig: Record<UtilityType, TypeConfig> = {
  electricity: {
    label: "Điện",
    value: "electricity",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
    accentColor: "bg-amber-500",
  },
  water: {
    label: "Nước",
    value: "water",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    accentColor: "bg-blue-500",
  },
};

export const statusFilterOptions = Object.values(utilityStatusConfig).map(
  (config) => ({
    label: config.label,
    value: config.value,
  }),
);

export const typeFilterOptions = Object.values(utilityTypeConfig).map(
  (config) => ({
    label: config.label,
    value: config.value,
  }),
);
