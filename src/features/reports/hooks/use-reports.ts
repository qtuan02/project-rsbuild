import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { getBuildingOptions } from "@/features/buildings/data/building.repository";

import { getReportsDashboardData } from "../data/reports.repository";
import { defaultReportFilters } from "../domain/reports-filter-params";
import { filterReports } from "../domain/reports-filters";

import type { ReportFilterParams } from "../domain/reports-filter-params";

export const useReports = () => {
  const [filters, setFilters] =
    useState<ReportFilterParams>(defaultReportFilters);

  const dashboardQuery = useQuery({
    queryKey: ["reports", "dashboard"],
    queryFn: getReportsDashboardData,
  });

  const allReports = useMemo(
    () => dashboardQuery.data?.reports ?? [],
    [dashboardQuery.data?.reports],
  );
  const filteredReports = useMemo(
    () => filterReports(allReports, filters),
    [allReports, filters],
  );
  const buildingOptions = getBuildingOptions().map((item) => ({
    value: item.name,
    label: item.name,
  }));

  return {
    buildingOptions: [
      { value: "all", label: "Tất cả tòa" },
      ...buildingOptions,
    ],
    reports: filteredReports,
    filters,
    setFilters,
    plSummary: dashboardQuery.data?.plSummary ?? {
      totalRevenue: 0,
      totalExpenses: 0,
      totalProfit: 0,
      avgOccupancy: 0,
    },
    overdueList: dashboardQuery.data?.overdueList ?? [],
    isLoading: dashboardQuery.isLoading,
    error: dashboardQuery.error ? "Không thể tải dữ liệu báo cáo." : null,
  };
};
