import type { Invoice } from "@/types/invoice";

export const mockInvoices: Invoice[] = Array.from({ length: 30 }).map(
  (_, i) => ({
    id: `I${String(i + 1).padStart(3, "0")}`,
    invoiceNumber: `HÓA-${String(i + 1).padStart(3, "0")}`,
    tenant:
      i % 2 === 0
        ? `Nguyễn Văn ${String.fromCharCode(65 + i)}`
        : `Trần Thị ${String.fromCharCode(65 + i)}`,
    room: `Phòng ${101 + (i % 20)}`,
    floor: Math.floor(i / 10) + 1,
    amount: 3000000 + (i % 5) * 200000,
    month: "04/2026",
    dueDate: "10/04/2026",
    status:
      i % 5 === 0
        ? "overdue"
        : i % 8 === 0
          ? "cancelled"
          : i % 3 === 0
            ? "pending"
            : "paid",
    paymentDate: i % 3 === 0 ? null : "08/04/2026",
    lastUpdated: "20/04/2026",
    buildingId: i < 10 ? "b1" : i < 20 ? "b2" : "b3",
  }),
);
