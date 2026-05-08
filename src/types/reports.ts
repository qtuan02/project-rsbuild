export interface ReportData {
  month: string;
  building: string;
  floor: string;
  revenue: number;
  expenses: number;
  profit: number;
  occupancyRate: number;
  waterUsage: number;
  electricityUsage: number;
  overdueTenants: number;
  totalTenants: number;
}

export interface OverdueDebt {
  id: string;
  tenant: string;
  room: string;
  amount: number;
  daysOverdue: number;
  reason: string;
}

export interface ProfitLossSummary {
  totalRevenue: number;
  totalExpenses: number;
  totalProfit: number;
  avgOccupancy: number;
}
