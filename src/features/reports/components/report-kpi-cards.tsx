import { TrendingDown, TrendingUp, Users, Zap } from "lucide-react";

import { SummaryCard } from "@/components/shared/cards/summary-card";

interface ReportKPICardsProps {
  totalRevenue: number;
  totalExpenses: number;
  profit: number;
  avgOccupancy: number;
}

export const ReportKPICards = ({
  totalRevenue,
  totalExpenses,
  profit,
  avgOccupancy,
}: ReportKPICardsProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        label="Tổng doanh thu"
        value={formatCurrency(totalRevenue)}
        icon={TrendingUp}
        bgColor="bg-green-100"
        iconColor="text-green-600"
      />
      <SummaryCard
        label="Chi phí"
        value={formatCurrency(totalExpenses)}
        icon={TrendingDown}
        bgColor="bg-red-100"
        iconColor="text-red-600"
      />
      <SummaryCard
        label="Lợi nhuận"
        value={formatCurrency(profit)}
        icon={Zap}
        bgColor="bg-blue-100"
        iconColor="text-blue-600"
      />
      <SummaryCard
        label="Lấp đầy phòng"
        value={`${avgOccupancy}%`}
        icon={Users}
        bgColor="bg-purple-100"
        iconColor="text-purple-600"
      />
    </div>
  );
};
