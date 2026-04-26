import { mockBuildings } from "@/features/buildings/data/buildings";

import { mockSupplierBills } from "../data/supplier-bills.mock";

export const useSupplierBillDetail = (billId: string) => {
  const bill = mockSupplierBills.find((item) => item.id === billId);
  const building = mockBuildings.find((item) => item.id === bill?.buildingId);

  return {
    bill,
    buildingName: building?.name ?? "Không xác định",
  };
};
