import { useMemo } from "react";

import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/components/shared/table";
import { useBuildingStore } from "@/stores/building.store";
import type { Expense } from "@/types/expense";

import { getExpenses } from "../data/expense.repository";

export const useExpenseList = () => {
  const { selectedBuildingId } = useBuildingStore();
  const expensesSource = useMemo(() => getExpenses(), []);

  const expenses = useMemo(
    () =>
      expensesSource.filter(
        (expense) =>
          !selectedBuildingId || expense.buildingId === selectedBuildingId,
      ),
    [expensesSource, selectedBuildingId],
  );

  const searchableColumns: DataTableSearchableColumn<Expense>[] = [
    { id: "category", title: "danh mục" },
    { id: "description", title: "mô tả" },
  ];

  const filterableColumns: DataTableFilterableColumn<Expense>[] = [
    {
      id: "category",
      title: "Danh mục",
      options: Array.from(new Set(expensesSource.map((e) => e.category))).map(
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
