import type { Expense } from "@/types/expense";

export const mockExpenses: Expense[] = [
  {
    id: "exp-1",
    buildingId: "b1",
    category: "Bảo trì",
    amount: 1200000,
    description: "Thay bóng đèn hành lang tầng 1-3",
    expenseDate: "2024-04-10",
  },
  {
    id: "exp-2",
    buildingId: "b1",
    category: "Vệ sinh",
    amount: 800000,
    description: "Dọn vệ sinh khu chung tháng 4",
    expenseDate: "2024-04-12",
  },
  {
    id: "exp-3",
    buildingId: "b2",
    category: "An ninh",
    amount: 3500000,
    description: "Chi phí bảo vệ ca đêm",
    expenseDate: "2024-04-08",
  },
  {
    id: "exp-4",
    buildingId: "b3",
    category: "Thiết bị",
    amount: 2200000,
    description: "Mua mới 02 bình chữa cháy",
    expenseDate: "2024-04-15",
  },
  {
    id: "exp-5",
    buildingId: "b4",
    category: "Sửa chữa",
    amount: 4500000,
    description: "Sửa hệ thống bơm nước",
    expenseDate: "2024-04-20",
  },
  {
    id: "exp-6",
    buildingId: "b2",
    category: "Khác",
    amount: 950000,
    description: "Văn phòng phẩm và vật tư quản lý",
    expenseDate: "2024-04-22",
  },
];
