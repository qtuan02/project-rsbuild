import type { UtilityStatus, UtilityType } from "@/types/utility";

interface StatusConfig {
  label: string;
  value: UtilityStatus;
}

interface TypeConfig {
  label: string;
  value: UtilityType;
}

export const utilityStatusConfig: Record<UtilityStatus, StatusConfig> = {
  draft: {
    label: "Nháp",
    value: "draft",
  },
  verified: {
    label: "Đã xác minh",
    value: "verified",
  },
  anomaly: {
    label: "Bất thường",
    value: "anomaly",
  },
};

export const utilityTypeConfig: Record<UtilityType, TypeConfig> = {
  electricity: {
    label: "Điện",
    value: "electricity",
  },
  water: {
    label: "Nước",
    value: "water",
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
