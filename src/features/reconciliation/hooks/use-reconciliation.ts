import { useMemo } from "react";

import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/components/shared/table";
import { useBuildingStore } from "@/stores/building.store";
import type { ReconciliationItem } from "@/types/reconciliation";

import { mockReconciliationData } from "../data/reconciliation.mock";

export const useReconciliation = () => {
  const { selectedBuildingId } = useBuildingStore();

  const data = useMemo(
    () =>
      mockReconciliationData.filter(
        (item) => !selectedBuildingId || item.buildingId === selectedBuildingId,
      ),
    [selectedBuildingId],
  );

  const stats = useMemo(() => {
    const totalIncome = data.reduce((acc, curr) => acc + curr.income, 0);
    const totalExpense = data.reduce((acc, curr) => acc + curr.expense, 0);
    const netProfit = totalIncome - totalExpense;
    const profitMargin =
      totalIncome > 0 ? Math.round((netProfit / totalIncome) * 1000) / 10 : 0;

    return {
      totalIncome,
      totalExpense,
      netProfit,
      profitMargin,
    };
  }, [data]);

  const searchableColumns: DataTableSearchableColumn<ReconciliationItem>[] = [
    { id: "item", title: "hạng mục" },
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
