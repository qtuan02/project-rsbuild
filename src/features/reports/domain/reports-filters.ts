import type { ReportFilterParams } from "./reports-filter-params";
import type { ReportData } from "../data/reports.mock";

export const BUILDING_OPTIONS = [
  { value: "all", label: "Tất cả tòa" },
  { value: "toa-a", label: "Tòa A" },
  { value: "toa-b", label: "Tòa B" },
  { value: "toa-c", label: "Tòa C" },
];

export const FLOOR_OPTIONS = [
  { value: "all", label: "Tất cả tầng" },
  { value: "floor-1", label: "Tầng 1" },
  { value: "floor-2", label: "Tầng 2" },
  { value: "floor-3", label: "Tầng 3" },
];

export const STATUS_OPTIONS = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "good", label: "Tốt" },
  { value: "warning", label: "Cảnh báo" },
  { value: "critical", label: "Nguy hiểm" },
];

const BUILDING_SLUG_TO_LABEL: Record<string, string> = {
  "toa-a": "Tòa A",
  "toa-b": "Tòa B",
  "toa-c": "Tòa C",
};

const FLOOR_SLUG_TO_LABEL: Record<string, string> = {
  "floor-1": "Tầng 1",
  "floor-2": "Tầng 2",
  "floor-3": "Tầng 3",
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
      report.building !== BUILDING_SLUG_TO_LABEL[filters.building]
    ) {
      return false;
    }
    if (
      filters.floor &&
      filters.floor !== "all" &&
      report.floor !== FLOOR_SLUG_TO_LABEL[filters.floor]
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
