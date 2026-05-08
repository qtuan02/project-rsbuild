import { useMemo } from "react";

import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/components/shared/table";
import { useBuildingStore } from "@/stores/building.store";
import type { ReconciliationItem } from "@/types/reconciliation";

import { getReconciliationItems } from "../data/reconciliation.repository";

export const useReconciliation = () => {
  const { selectedBuildingId } = useBuildingStore();
  const dataSource = useMemo(() => getReconciliationItems(), []);

  const data = useMemo(
    () =>
      dataSource.filter(
        (item) => !selectedBuildingId || item.buildingId === selectedBuildingId,
      ),
    [dataSource, selectedBuildingId],
  );

  const stats = useMemo(() => {
    const totalIncomeAmount = data.reduce(
      (acc, curr) => acc + curr.incomeAmount,
      0,
    );
    const totalExpenseAmount = data.reduce(
      (acc, curr) => acc + curr.expenseAmount,
      0,
    );
    const netProfitAmount = totalIncomeAmount - totalExpenseAmount;
    const profitMargin =
      totalIncomeAmount > 0
        ? Math.round((netProfitAmount / totalIncomeAmount) * 1000) / 10
        : 0;

    return {
      totalIncomeAmount,
      totalExpenseAmount,
      netProfitAmount,
      profitMargin,
    };
  }, [data]);

  const searchableColumns: DataTableSearchableColumn<ReconciliationItem>[] = [
    { id: "lineItemName", title: "hạng mục" },
  ];

  const filterableColumns: DataTableFilterableColumn<ReconciliationItem>[] = [
    {
      id: "status",
      title: "Trạng thái",
      options: [
        { label: "Lãi", value: "gain" },
        { label: "Lỗ", value: "loss" },
      ],
    },
  ];

  return {
    data,
    stats,
    searchableColumns,
    filterableColumns,
  };
};
