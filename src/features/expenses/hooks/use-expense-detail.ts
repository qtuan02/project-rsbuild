import { mockBuildings } from "@/features/buildings/data/buildings";

import { mockExpenses } from "../data/expense.mock";

export const useExpenseDetail = (expenseId: string) => {
  const expense = mockExpenses.find((item) => item.id === expenseId);
  const building = mockBuildings.find(
    (item) => item.id === expense?.buildingId,
  );

  return {
    expense,
    buildingName: building?.name ?? "Không xác định",
  };
};
