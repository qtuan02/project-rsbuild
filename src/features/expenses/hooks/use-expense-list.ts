import { useMemo } from "react";

import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/components/shared/table";
import { useBuildingStore } from "@/stores/building.store";
import type { Expense } from "@/types/expense";

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

  const searchableColumns: DataTableSearchableColumn<Expense>[] = [
    { id: "category", title: "danh mục" },
    { id: "description", title: "mô tả" },
  ];

  const filterableColumns: DataTableFilterableColumn<Expense>[] = [
    {
      id: "category",
      title: "Danh mục",
      options: Array.from(new Set(mockExpenses.map((e) => e.category))).map(
        (cat) => ({ label: cat, value: cat }),
      ),
    },
  ];

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
    searchableColumns,
    filterableColumns,
  };
};
