export interface ReconciliationItem {
  id: string;
  buildingId: string;
  item: string;
  income: number;
  expense: number;
  diff: number;
  status: "gain" | "loss";
  trend?: number;
}

export interface ReconciliationStats {
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
  profitMargin: number;
}
