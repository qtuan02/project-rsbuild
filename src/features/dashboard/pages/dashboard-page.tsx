import {
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  DollarSign,
  TrendingUp,
  UserCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CashFlowChart } from "../components/cash-flow-chart";
import { OccupancyDonutChart } from "../components/occupancy-donut-chart";
import { RevenueChart } from "../components/revenue-chart";

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
    value: "145",
    description: "trên toàn bộ tòa nhà",
    icon: Building2,
    trend: { value: "+12", positive: true },
  },
  {
    title: "Tỷ lệ lấp đầy",
    value: "94.2%",
    description: "hiệu suất tối ưu",
    icon: UserCheck,
    trend: { value: "+2.5%", positive: true },
  },
  {
    title: "Doanh thu tháng",
    value: "545.2tr",
    description: "kỳ báo cáo tháng 4",
    icon: DollarSign,
    trend: { value: "+15.3%", positive: true },
  },
  {
    title: "Chi phí vận hành",
    value: "123.5tr",
    description: "tiền điện, nước, dịch vụ",
    icon: TrendingUp,
    trend: { value: "-4.2%", positive: false },
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
    action: "Phòng trống",
    detail: "Phòng 405 đã trả phòng, sẵn sàng cho thuê",
    time: "1 ngày trước",
  },
];

const pendingTasks = [
  {
    id: 1,
    title: "Sửa vòi nước phòng 108",
    type: "Bảo trì",
    priority: "Cao",
    due: "Hôm nay",
  },
  {
    id: 2,
    title: "Phòng 302 - Lê Thị C sắp hết hạn hợp đồng",
    type: "Hợp đồng",
    priority: "Vừa",
    due: "Trong 3 ngày",
  },
  {
    id: 3,
    title: "Hóa đơn phòng 204 quá hạn",
    type: "Hóa đơn",
    priority: "Khẩn cấp",
    due: "Quá hạn 2 ngày",
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
        {/* Revenue chart */}
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-semibold">
                Doanh thu & Thu chi
              </CardTitle>
              <CardDescription>
                Xu hướng tài chính trong 6 tháng qua
              </CardDescription>
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              <TrendingUp className="h-3.5 w-3.5" />
              <span className="font-medium">+12.3% tháng này</span>
            </div>
          </CardHeader>
          <CardContent className="pl-0">
            <Tabs defaultValue="revenue" className="w-full">
              <div className="px-6 mb-4">
                <TabsList>
                  <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
                  <TabsTrigger value="cashflow">Thu vs Chi</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="revenue">
                <RevenueChart />
              </TabsContent>
              <TabsContent value="cashflow">
                <CashFlowChart />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Occupancy Donut */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Tỷ lệ lấp đầy
            </CardTitle>
            <CardDescription>
              Trạng thái phòng hiện tại của tòa nhà
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OccupancyDonutChart />
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-primary/5">
                <span className="text-sm text-muted-foreground">Đang thuê</span>
                <span className="text-xl font-bold text-primary">42</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Còn trống</span>
                <span className="text-xl font-bold">6</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task List & Activity (New Layout) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Task List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Việc cần làm
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start justify-between gap-2 border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium leading-tight">
                        {task.title}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{task.type}</span>
                        <span>•</span>
                        <span
                          className={
                            task.due.includes("Quá hạn") ||
                            task.due.includes("Hôm nay")
                              ? "text-red-600 font-medium"
                              : ""
                          }
                        >
                          {task.due}
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant={
                        task.priority === "Khẩn cấp"
                          ? "destructive"
                          : task.priority === "Cao"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {/* Recent activity */}
          <Card className="h-full">
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
    </div>
  );
};
