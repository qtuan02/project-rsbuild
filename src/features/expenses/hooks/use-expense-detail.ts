import { getExpenseById } from "../data/expense.repository";

export const useExpenseDetail = (expenseId: string) => {
  const expense = getExpenseById(expenseId);

  return {
    expense,
    buildingName: expense?.buildingName ?? "Khong xac dinh",
  };
};
