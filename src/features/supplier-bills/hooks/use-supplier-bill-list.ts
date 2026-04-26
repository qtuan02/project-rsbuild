import { useMemo } from "react";

import { useBuildingStore } from "@/stores/building.store";

import { mockSupplierBills } from "../data/supplier-bills.mock";

export const useSupplierBillList = () => {
  const { selectedBuildingId } = useBuildingStore();

  const bills = useMemo(
    () =>
      mockSupplierBills.filter(
        (bill) => !selectedBuildingId || bill.buildingId === selectedBuildingId,
      ),
    [selectedBuildingId],
  );

  const totals = useMemo(
    () => ({
      totalAmount: bills.reduce((acc, bill) => acc + bill.totalAmount, 0),
      pendingAmount: bills
        .filter((bill) => !bill.paymentDate)
        .reduce((acc, bill) => acc + bill.totalAmount, 0),
      count: bills.length,
    }),
    [bills],
  );

  return {
    bills,
    totals,
  };
};
