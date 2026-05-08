export interface BatchInvoicePreviewItem {
  id: string;
  room: string;
  tenant: string;
  rent: number;
  electricity: number;
  water: number;
  service: number;
}

export const mockBatchInvoiceItems: BatchInvoicePreviewItem[] = [
  {
    id: "1",
    room: "101",
    tenant: "Nguyễn Văn A",
    rent: 3000000,
    electricity: 350000,
    water: 60000,
    service: 100000,
  },
  {
    id: "2",
    room: "102",
    tenant: "Trần Thị B",
    rent: 3000000,
    electricity: 420000,
    water: 80000,
    service: 100000,
  },
  {
    id: "3",
    room: "103",
    tenant: "Lê Văn C",
    rent: 2500000,
    electricity: 210000,
    water: 40000,
    service: 100000,
  },
];
