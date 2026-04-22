import {
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  DollarSign,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: typeof Building2;
  trend?: { value: string; positive: boolean };
}

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
}: StatCardProps) => (
  <Card className="relative overflow-hidden transition-shadow hover:shadow-md">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-4.5 w-4.5 text-primary" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold tracking-tight">{value}</div>
      <div className="mt-1 flex items-center gap-1.5">
        {trend ? (
          <>
            <span
              className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                trend.positive ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {trend.positive ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              {trend.value}
            </span>
            <span className="text-xs text-muted-foreground">{description}</span>
          </>
        ) : (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </CardContent>
  </Card>
);

const stats: StatCardProps[] = [
  {
    title: "Tổng số phòng",
    value: "48",
    description: "so với tháng trước",
    icon: Building2,
    trend: { value: "+2", positive: true },
  },
  {
    title: "Đã cho thuê",
    value: "42",
    description: "tỷ lệ lấp đầy 87.5%",
    icon: UserCheck,
    trend: { value: "+5.2%", positive: true },
  },
  {
    title: "Khách thuê",
    value: "67",
    description: "so với tháng trước",
    icon: Users,
    trend: { value: "+3", positive: true },
  },
  {
    title: "Doanh thu tháng",
    value: "126.5tr",
    description: "so với tháng trước",
    icon: DollarSign,
    trend: { value: "+12.3%", positive: true },
  },
];

const recentActivities = [
  {
    action: "Khách thuê mới",
    detail: "Trần Văn B đã ký hợp đồng phòng 201",
    time: "2 giờ trước",
  },
  {
    action: "Thanh toán",
    detail: "Phòng 105 đã thanh toán hóa đơn tháng 4",
    time: "3 giờ trước",
  },
  {
    action: "Hợp đồng hết hạn",
    detail: "Phòng 302 - Lê Thị C cần gia hạn",
    time: "5 giờ trước",
  },
  {
    action: "Bảo trì",
    detail: "Phòng 108 yêu cầu sửa điều hòa",
    time: "1 ngày trước",
  },
  {
    action: "Phòng trống",
    detail: "Phòng 405 đã trả phòng, sẵn sàng cho thuê",
    time: "1 ngày trước",
  },
];

export const DashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Xin chào! 👋</h2>
        <p className="mt-1 text-muted-foreground">
          Đây là tổng quan hoạt động quản lý phòng trọ trong tháng này.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Content grid */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Revenue chart placeholder */}
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">Doanh thu</CardTitle>
            <div className="flex items-center gap-1 text-xs text-emerald-600">
              <TrendingUp className="h-3.5 w-3.5" />
              <span className="font-medium">+12.3% tháng này</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex h-[220px] items-center justify-center rounded-lg border border-dashed border-border bg-muted/30">
              <div className="text-center">
                <TrendingUp className="mx-auto h-8 w-8 text-muted-foreground/40" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Biểu đồ doanh thu sẽ hiển thị ở đây
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Hoạt động gần đây
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary/60" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-tight">
                      {activity.action}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {activity.detail}
                    </p>
                  </div>
                  <span className="shrink-0 text-[11px] text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
