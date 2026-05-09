import { getSupplierBillById } from "../data/supplier-bill.repository";

export const useSupplierBillDetail = (billId: string) => {
  const bill = getSupplierBillById(billId);

  return {
    bill,
    buildingName: bill?.buildingName ?? "Khong xac dinh",
  };
};
