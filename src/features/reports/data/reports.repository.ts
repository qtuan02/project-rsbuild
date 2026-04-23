import { getReportData, getPLSummary, getOverdueDebts } from "./reports.mock";

export const getReports = () => [...getReportData()];

export const getProfitLossSummary = () => ({ ...getPLSummary() });

export const getOverdueList = () => [...getOverdueDebts()];
