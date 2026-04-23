import * as React from "react";

import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/components/shared/table";
import type { Tenant } from "@/types/tenant";

import { getTenants } from "../data/tenant.repository";
import { buildTenantSummaryStats } from "../domain/tenant-stats";
import { tenantStatusConfig } from "../domain/tenant-status-config";

export interface UseTenantListResult {
  data: Tenant[];
  summaryStats: ReturnType<typeof buildTenantSummaryStats>;
  searchableColumns: DataTableSearchableColumn<Tenant>[];
  filterableColumns: DataTableFilterableColumn<Tenant>[];
}

export const useTenantList = (): UseTenantListResult => {
  const [data] = React.useState<Tenant[]>(() => getTenants());

  const summaryStats = React.useMemo(
    () => buildTenantSummaryStats(data),
    [data],
  );
  const searchableColumns = React.useMemo<DataTableSearchableColumn<Tenant>[]>(
    () => [
      { id: "name", title: "tên khách" },
      { id: "room", title: "phòng" },
    ],
    [],
  );
  const filterableColumns = React.useMemo<DataTableFilterableColumn<Tenant>[]>(
    () => [
      {
        id: "status",
        title: "Trạng thái",
        options: Object.entries(tenantStatusConfig).map(([key, config]) => ({
          value: key,
          label: config.label,
        })),
      },
    ],
    [],
  );

  return {
    data,
    summaryStats,
    searchableColumns,
    filterableColumns,
  };
};
