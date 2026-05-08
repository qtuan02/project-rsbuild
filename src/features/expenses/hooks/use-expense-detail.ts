import { getBuildingById } from "@/features/buildings/data/building.repository";

import { getExpenseById } from "../data/expense.repository";

export const useExpenseDetail = (expenseId: string) => {
  const expense = getExpenseById(expenseId);
  const building = expense ? getBuildingById(expense.buildingId) : undefined;

  return {
    expense,
    buildingName: building?.name ?? "Không xác định",
  };
};
