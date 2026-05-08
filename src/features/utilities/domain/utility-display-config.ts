import { getStatusClassName, utilityTypeColors } from "@/config/colors";
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
    className: getStatusClassName("neutral"),
  },
  verified: {
    label: "Đã xác minh",
    value: "verified",
    className: getStatusClassName("success"),
  },
  anomaly: {
    label: "Bất thường",
    value: "anomaly",
    className: getStatusClassName("error"),
  },
};

export const utilityTypeConfig: Record<UtilityType, TypeConfig> = {
  electricity: {
    label: "Điện",
    value: "electricity",
    color: utilityTypeColors.electricity.text,
    bgColor: utilityTypeColors.electricity.bg,
    accentColor: utilityTypeColors.electricity.accent,
  },
  water: {
    label: "Nước",
    value: "water",
    color: utilityTypeColors.water.text,
    bgColor: utilityTypeColors.water.bg,
    accentColor: utilityTypeColors.water.accent,
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
