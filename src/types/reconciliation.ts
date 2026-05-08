export interface ReconciliationItem {
  id: string;
  buildingId: string;
  lineItemName: string;
  incomeAmount: number;
  expenseAmount: number;
  netAmount: number;
  status: "gain" | "loss";
  trendRate?: number;
}

export interface ReconciliationStats {
  totalIncomeAmount: number;
  totalExpenseAmount: number;
  netProfitAmount: number;
  profitMargin: number;
}
