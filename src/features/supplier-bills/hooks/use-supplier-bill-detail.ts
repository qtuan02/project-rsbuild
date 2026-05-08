import { getBuildingById } from "@/features/buildings/data/building.repository";

import { getSupplierBillById } from "../data/supplier-bill.repository";

export const useSupplierBillDetail = (billId: string) => {
  const bill = getSupplierBillById(billId);
  const building = bill ? getBuildingById(bill.buildingId) : undefined;

  return {
    bill,
    buildingName: building?.name ?? "Không xác định",
  };
};
