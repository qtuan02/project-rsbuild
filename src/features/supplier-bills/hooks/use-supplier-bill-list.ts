import { useMemo } from "react";

import { useBuildingStore } from "@/stores/building.store";

import { getSupplierBills } from "../data/supplier-bill.repository";

export const useSupplierBillList = () => {
  const { selectedBuildingId } = useBuildingStore();
  const billsSource = useMemo(() => getSupplierBills(), []);

  const bills = useMemo(
    () =>
      billsSource.filter(
        (bill) => !selectedBuildingId || bill.buildingId === selectedBuildingId,
      ),
    [billsSource, selectedBuildingId],
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
