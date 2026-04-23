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

export const mockReportData: ReportData[] = [
  {
    month: "04/2026",
    building: "Tòa A",
    floor: "Tầng 1",
    revenue: 50000000,
    expenses: 12000000,
    profit: 38000000,
    occupancyRate: 92,
    waterUsage: 250,
    electricityUsage: 1200,
    overdueTenants: 1,
    totalTenants: 8,
  },
  {
    month: "04/2026",
    building: "Tòa A",
    floor: "Tầng 2",
    revenue: 45000000,
    expenses: 10000000,
    profit: 35000000,
    occupancyRate: 88,
    waterUsage: 220,
    electricityUsage: 1100,
    overdueTenants: 2,
    totalTenants: 8,
  },
  {
    month: "03/2026",
    building: "Tòa A",
    floor: "Tầng 1",
    revenue: 50000000,
    expenses: 11000000,
    profit: 39000000,
    occupancyRate: 95,
    waterUsage: 240,
    electricityUsage: 1150,
    overdueTenants: 0,
    totalTenants: 8,
  },
];

export interface OverdueDebt {
  id: string;
  tenant: string;
  room: string;
  amount: number;
  daysOverdue: number;
  reason: string;
}

export const mockOverdueDebts: OverdueDebt[] = [
  {
    id: "OD001",
    tenant: "Trần Văn Hùng",
    room: "Phòng 203",
    amount: 5000000,
    daysOverdue: 45,
    reason: "Tiền thuê nhà tháng 02/2026",
  },
  {
    id: "OD002",
    tenant: "Lê Thị Hương",
    room: "Phòng 210",
    amount: 2500000,
    daysOverdue: 15,
    reason: "Tiền điện tháng 03/2026",
  },
];

export const getPLSummary = () => ({
  totalRevenue: 145000000,
  totalExpenses: 33000000,
  totalProfit: 112000000,
  avgOccupancy: 90,
});

export const getOverdueDebts = () => mockOverdueDebts;

export const getReportData = () => mockReportData;
