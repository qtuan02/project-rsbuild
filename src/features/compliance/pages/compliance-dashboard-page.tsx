import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ResidenceChecklistCard } from "../components/residence-checklist-card";
import { getComplianceItems } from "../data/compliance.mock";

export const ComplianceDashboardPage = () => {
  const items = getComplianceItems();

  const stats = {
    completed: items.filter((i) => i.status === "completed").length,
    pending: items.filter((i) => i.status === "pending").length,
    overdue: items.filter((i) => i.status === "overdue").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tuân thủ</h1>
          <p className="mt-2 text-muted-foreground">
            Quản lý khai báo nơi ở, kiểm tra an toàn và tài liệu.
          </p>
        </div>
        <Button>Thêm yêu cầu tuân thủ</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hoàn thành</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.completed} yêu cầu đã hoàn thành
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chờ xử lý</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.pending} yêu cầu đang chờ
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quá hạn</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats.overdue}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.overdue} yêu cầu quá hạn
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Items by Type */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Residence Declaration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Khai báo nơi ở</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {items
                .filter((i) => i.type === "residence_declaration")
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50"
                  >
                    <div>
                      <p className="text-sm font-medium">{item.tenant}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.room}
                      </p>
                    </div>
                    <Badge
                      className={
                        item.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : item.status === "pending"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                      }
                      variant="secondary"
                    >
                      {item.status === "completed"
                        ? "✓ Hoàn thành"
                        : item.status === "pending"
                          ? "⏳ Chờ"
                          : "⚠ Quá hạn"}
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Safety Inspection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Kiểm tra an toàn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {items
                .filter((i) => i.type === "safety_inspection")
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50"
                  >
                    <div>
                      <p className="text-sm font-medium">{item.tenant}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.room}
                      </p>
                    </div>
                    <Badge
                      className={
                        item.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : item.status === "pending"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                      }
                      variant="secondary"
                    >
                      {item.status === "completed"
                        ? "✓ Hoàn thành"
                        : item.status === "pending"
                          ? "⏳ Chờ"
                          : "⚠ Quá hạn"}
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Full Checklist */}
      <ResidenceChecklistCard items={items} />
    </div>
  );
};
