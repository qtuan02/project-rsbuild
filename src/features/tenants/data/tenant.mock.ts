import type { Tenant } from "@/types/tenant";

const avatarColors = [
  "bg-rose-500",
  "bg-pink-500",
  "bg-fuchsia-500",
  "bg-purple-500",
  "bg-violet-500",
  "bg-indigo-500",
  "bg-blue-500",
  "bg-sky-500",
  "bg-cyan-500",
  "bg-teal-500",
  "bg-emerald-500",
  "bg-green-500",
  "bg-amber-500",
  "bg-orange-500",
];

export const mockTenants: Tenant[] = Array.from({ length: 30 }).map((_, i) => ({
  id: `T${String(i + 1).padStart(3, "0")}`,
  name:
    i % 2 === 0
      ? `Nguyễn Văn ${String.fromCharCode(65 + i)}`
      : `Trần Thị ${String.fromCharCode(65 + i)}`,
  phone: `090${i}${123456 + i}`,
  email: `tenant${i}@gmail.com`,
  room: `Phòng ${101 + (i % 20)}`,
  floor: Math.floor(i / 10) + 1,
  rentAmount: 2500000 + (i % 5) * 500000,
  depositAmount: 2500000 + (i % 5) * 500000,
  moveInDate: "01/01/2024",
  contractEnd: "01/01/2025",
  status: i % 10 === 0 ? "overdue" : i % 8 === 0 ? "ended" : "active",
  idNumber: `079123456${String(i).padStart(3, "0")}`,
  gender: i % 2 === 0 ? "male" : "female",
  avatarColor: avatarColors[i % avatarColors.length],
  buildingId: i < 10 ? "b1" : i < 20 ? "b2" : "b3",
}));
