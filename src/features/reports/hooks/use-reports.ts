import { useEffect, useMemo, useState } from "react";

import {
  getOverdueList,
  getProfitLossSummary,
  getReports,
} from "../data/reports.repository";
import { defaultReportFilters } from "../domain/reports-filter-params";
import { filterReports } from "../domain/reports-filters";

import type { ReportFilterParams } from "../domain/reports-filter-params";

export const useReports = () => {
  const [filters, setFilters] =
    useState<ReportFilterParams>(defaultReportFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 350));
      } catch {
        if (!cancelled) {
          setError("Không thể tải dữ liệu báo cáo.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const allReports = useMemo(() => getReports(), []);
  const plSummary = useMemo(() => getProfitLossSummary(), []);
  const overdueList = useMemo(() => getOverdueList(), []);

  const filteredReports = useMemo(
    () => filterReports(allReports, filters),
    [allReports, filters],
  );

  return {
    reports: filteredReports,
    filters,
    setFilters,
    plSummary,
    overdueList,
    isLoading,
    error,
  };
};
