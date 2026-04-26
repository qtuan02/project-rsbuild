import { STATUS_COLORS, TYPE_COLORS } from "@/config/colors";
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
    className: `${STATUS_COLORS.neutral.light.border} ${STATUS_COLORS.neutral.light.bg} ${STATUS_COLORS.neutral.light.text} ${STATUS_COLORS.neutral.dark.bg} ${STATUS_COLORS.neutral.dark.text} ${STATUS_COLORS.neutral.dark.border}`,
  },
  verified: {
    label: "Đã xác minh",
    value: "verified",
    className: `${STATUS_COLORS.success.light.border} ${STATUS_COLORS.success.light.bg} ${STATUS_COLORS.success.light.text} ${STATUS_COLORS.success.dark.bg} ${STATUS_COLORS.success.dark.text} ${STATUS_COLORS.success.dark.border}`,
  },
  anomaly: {
    label: "Bất thường",
    value: "anomaly",
    className: `${STATUS_COLORS.error.light.border} ${STATUS_COLORS.error.light.bg} ${STATUS_COLORS.error.light.text} ${STATUS_COLORS.error.dark.bg} ${STATUS_COLORS.error.dark.text} ${STATUS_COLORS.error.dark.border}`,
  },
};

export const utilityTypeConfig: Record<UtilityType, TypeConfig> = {
  electricity: {
    label: "Điện",
    value: "electricity",
    color: TYPE_COLORS.electricity.text,
    bgColor: TYPE_COLORS.electricity.bg,
    accentColor: TYPE_COLORS.electricity.accent,
  },
  water: {
    label: "Nước",
    value: "water",
    color: TYPE_COLORS.water.text,
    bgColor: TYPE_COLORS.water.bg,
    accentColor: TYPE_COLORS.water.accent,
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
