import type { SupplierBill } from "@/types/supplier-bill";

import { mockSupplierBills } from "./supplier-bills.mock";

const resolveBuildingName = (buildingId: string): string =>
  `Toa nha ${buildingId.toUpperCase()}`;

export const getSupplierBills = (): SupplierBill[] =>
  mockSupplierBills.map((supplierBill) => ({
    ...supplierBill,
    buildingName: resolveBuildingName(supplierBill.buildingId),
  }));

export const getSupplierBillById = (billId: string): SupplierBill | undefined =>
  getSupplierBills().find((item) => item.id === billId);
