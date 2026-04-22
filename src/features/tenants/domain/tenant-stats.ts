import type { Tenant } from "@/types/tenant";

export interface TenantSummaryStats {
  total: number;
  active: number;
  pending: number;
  overdue: number;
}

export const buildTenantSummaryStats = (
  tenants: Tenant[],
): TenantSummaryStats => {
  return {
    total: tenants.length,
    active: tenants.filter((tenant) => tenant.status === "active").length,
    pending: tenants.filter((tenant) => tenant.status === "pending").length,
    overdue: tenants.filter((tenant) => tenant.status === "overdue").length,
  };
};
