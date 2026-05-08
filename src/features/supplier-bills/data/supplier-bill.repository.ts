import type { SupplierBill } from "@/types/supplier-bill";

import { mockSupplierBills } from "./supplier-bills.mock";

export const getSupplierBills = (): SupplierBill[] => [...mockSupplierBills];

export const getSupplierBillById = (billId: string): SupplierBill | undefined =>
  getSupplierBills().find((item) => item.id === billId);
