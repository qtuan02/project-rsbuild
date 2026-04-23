import { useState } from "react";

import {
  getReports,
  getProfitLossSummary,
  getOverdueList,
} from "../data/reports.repository";
import { defaultReportFilters } from "../domain/reports-filter-params";

import type { ReportFilterParams } from "../domain/reports-filter-params";

export const useReports = () => {
  const [filters, setFilters] =
    useState<ReportFilterParams>(defaultReportFilters);
  const reports = getReports();
  const plSummary = getProfitLossSummary();
  const overdueList = getOverdueList();

  const filteredReports = reports.filter((report) => {
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
      report.floor !== filters.floor
    ) {
      return false;
    }
    return true;
  });

  return {
    reports: filteredReports,
    filters,
    setFilters,
    plSummary,
    overdueList,
  };
};
