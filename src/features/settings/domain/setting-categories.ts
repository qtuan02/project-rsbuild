import type { SettingCategory } from "@/types/setting";
import { Building2, DollarSign, Bell, CreditCard } from "lucide-react";

export const settingCategoryConfig: Record<
  SettingCategory,
  {
    label: string;
    icon: typeof Building2;
    description: string;
  }
> = {
  building: {
    label: "Thông tin tòa nhà",
    icon: Building2,
    description: "Quản lý thông tin cơ bản về tòa nhà",
  },
  rent: {
    label: "Cấu hình tiền thuê",
    icon: DollarSign,
    description: "Cài đặt các tham số liên quan đến tiền thuê",
  },
  notification: {
    label: "Thông báo",
    icon: Bell,
    description: "Cấu hình hệ thống thông báo",
  },
  billing: {
    label: "Hóa đơn & Thanh toán",
    icon: CreditCard,
    description: "Cài đặt hóa đơn và thanh toán",
  },
};

export const settingCategoryOrder: SettingCategory[] = [
  "building",
  "rent",
  "notification",
  "billing",
];
