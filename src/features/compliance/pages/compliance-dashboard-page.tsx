import { AlertCircle, CheckCircle2, Clock, Plus, FileDown } from "lucide-react";

import {
  EmptyPanel,
  ErrorPanel,
  LoadingPanel,
} from "@/components/shared/panels";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ResidenceChecklistCard } from "../components/residence-checklist-card";
import { useComplianceDashboard } from "../hooks/use-compliance-dashboard";

import type { ComplianceItem } from "../data/compliance.mock";

const filterByType = (items: ComplianceItem[], type: ComplianceItem["type"]) =>
  items.filter((i) => i.type === type);

export const ComplianceDashboardPage = () => {
  const { isLoading, error, items, stats } = useComplianceDashboard();

  if (error) {
    return (
      <div className="space-y-6">
        <ErrorPanel
          title="Không thể tải dữ liệu"
          description={error}
          action={{
            label: "Thử lại",
            onClick: () => window.location.reload(),
          }}
        />
      </div>
    );
  }

  if (isLoading) {
    return <LoadingPanel />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tuân thủ</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Quản lý khai báo nơi ở, kiểm tra an toàn và tài liệu.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto text-blue-600 border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-950/50"
          >
            <FileDown className="mr-2 h-4 w-4" />
            Tạo file CT01 (VNeID)
          </Button>
          <Button size="sm" className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Thêm yêu cầu
          </Button>
        </div>
      </div>

      {items.length === 0 ? (
        <EmptyPanel
          title="Chưa có yêu cầu tuân thủ"
          description="Thêm yêu cầu hoặc đồng bộ dữ liệu để theo dõi tại đây."
        />
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Hoàn thành
                </CardTitle>
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completed}</div>
                <p className="mt-1 text-xs text-muted-foreground">
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
                <p className="mt-1 text-xs text-muted-foreground">
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
                <p className="mt-1 text-xs text-muted-foreground">
                  {stats.overdue} yêu cầu quá hạn
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Khai báo nơi ở</CardTitle>
              </CardHeader>
              <CardContent>
                {filterByType(items, "residence_declaration").length > 0 ? (
                  <div className="space-y-3">
                    {filterByType(items, "residence_declaration").map(
                      (item) => (
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
                      ),
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Không có mục khai báo nơi ở.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Kiểm tra an toàn</CardTitle>
              </CardHeader>
              <CardContent>
                {filterByType(items, "safety_inspection").length > 0 ? (
                  <div className="space-y-3">
                    {filterByType(items, "safety_inspection").map((item) => (
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
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Không có mục kiểm tra an toàn.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <ResidenceChecklistCard items={items} />
        </>
      )}
    </div>
  );
};
