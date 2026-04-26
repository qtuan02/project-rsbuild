import { useMemo } from "react";

import { useBuildingStore } from "@/stores/building.store";

import { mockExpenses } from "../data/expense.mock";

export const useExpenseList = () => {
  const { selectedBuildingId } = useBuildingStore();

  const expenses = useMemo(
    () =>
      mockExpenses.filter(
        (expense) =>
          !selectedBuildingId || expense.buildingId === selectedBuildingId,
      ),
    [selectedBuildingId],
  );

  const stats = useMemo(
    () => ({
      totalAmount: expenses.reduce((sum, item) => sum + item.amount, 0),
      totalCount: expenses.length,
      averageAmount:
        expenses.length > 0
          ? Math.round(
              expenses.reduce((sum, item) => sum + item.amount, 0) /
                expenses.length,
            )
          : 0,
    }),
    [expenses],
  );

  return {
    expenses,
    stats,
  };
};
