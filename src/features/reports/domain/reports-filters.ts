import type { ReportData } from "@/types/reports";

import type { ReportFilterParams } from "./reports-filter-params";

export const reportStatusOptions = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "good", label: "Tốt" },
  { value: "warning", label: "Cảnh báo" },
  { value: "critical", label: "Nguy hiểm" },
];

const floorSlugToLabel: Record<string, string> = {
  "floor-1": "Tầng 1",
  "floor-2": "Tầng 2",
  "floor-3": "Tầng 3",
  "floor-4": "Tầng 4",
  "floor-5": "Tầng 5",
};

const reportStatusBucket = (
  occupancyRate: number,
): "good" | "warning" | "critical" => {
  if (occupancyRate >= 90) {
    return "good";
  }
  if (occupancyRate >= 70) {
    return "warning";
  }
  return "critical";
};

export const filterReports = (
  reports: ReportData[],
  filters: ReportFilterParams,
): ReportData[] => {
  return reports.filter((report) => {
    if (
      filters.building &&
      filters.building !== "all" &&
      report.building !== filters.building
    ) {
      return false;
    }
    if (
      filters.floor &&
      filters.floor !== "all" &&
      report.floor !== floorSlugToLabel[filters.floor]
    ) {
      return false;
    }
    if (filters.status && filters.status !== "all") {
      if (reportStatusBucket(report.occupancyRate) !== filters.status) {
        return false;
      }
    }
    return true;
  });
};
