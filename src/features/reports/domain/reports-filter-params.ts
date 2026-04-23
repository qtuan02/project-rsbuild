export interface ReportFilterParams {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  building?: string;
  floor?: string;
  status?: string;
}

export const defaultReportFilters: ReportFilterParams = {
  dateRange: {
    startDate: "04/01/2026",
    endDate: "04/30/2026",
  },
  building: "all",
  floor: "all",
  status: "all",
};
