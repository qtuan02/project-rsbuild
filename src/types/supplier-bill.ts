export interface SupplierBill {
  id: string;
  buildingId: string;
  type: "electricity" | "water" | "trash" | "internet" | "other";
  supplierName: string;
  billingPeriod: string; // e.g., '2023-10'
  totalAmount: number;
  totalMeterIndex?: number;
  paymentDate?: string;
  invoiceImageUrl?: string;
}
