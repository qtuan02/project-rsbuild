export interface Expense {
  id: string;
  buildingId: string;
  buildingName: string;
  category: string;
  amount: number;
  description?: string;
  expenseDate: string;
  receiptImageUrl?: string;
}
