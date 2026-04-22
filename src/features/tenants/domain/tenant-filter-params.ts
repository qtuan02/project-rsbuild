import { isTenantStatus, type TenantStatus } from "@/types/tenant";

export type FloorFilter = `${number}`;

const FLOOR_FILTER_REGEX = /^\d+$/;

export const toTenantStatuses = (
  value: unknown,
): TenantStatus[] | undefined => {
  if (!Array.isArray(value)) {
    return undefined;
  }

  return value.filter(
    (item): item is TenantStatus =>
      typeof item === "string" && isTenantStatus(item),
  );
};

export const toFloorFilters = (value: unknown): FloorFilter[] | undefined => {
  if (!Array.isArray(value)) {
    return undefined;
  }

  return value.filter(
    (item): item is FloorFilter =>
      typeof item === "string" && FLOOR_FILTER_REGEX.test(item),
  );
};
