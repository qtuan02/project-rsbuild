import {
  getOverdueDebts,
  getProfitLossSummarySnapshot,
  getReportData,
} from "./reports.mock";

const REPORTS_MOCK_DELAY_MS = 350;

const wait = async (delayMs: number) =>
  new Promise((resolve) => setTimeout(resolve, delayMs));

export const getReports = async () => {
  await wait(REPORTS_MOCK_DELAY_MS);
  return [...getReportData()];
};

export const getProfitLossSummary = async () => {
  await wait(REPORTS_MOCK_DELAY_MS);
  return { ...getProfitLossSummarySnapshot() };
};

export const getOverdueList = async () => {
  await wait(REPORTS_MOCK_DELAY_MS);
  return [...getOverdueDebts()];
};

export const getReportsDashboardData = async () => {
  const [reports, plSummary, overdueList] = await Promise.all([
    getReports(),
    getProfitLossSummary(),
    getOverdueList(),
  ]);

  return {
    reports,
    plSummary,
    overdueList,
  };
};
