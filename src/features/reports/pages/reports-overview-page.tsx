import { AlertCircle, Download } from "lucide-react";
import { toast } from "sonner";

import {
  EmptyPanel,
  ErrorPanel,
  LoadingPanel,
} from "@/components/shared/panels";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ReportFilters } from "../components/report-filters";
import { ReportKPICards } from "../components/report-kpi-cards";
import { ReportTable } from "../components/report-table";
import {
  defaultReportFilters,
  type ReportFilterParams,
} from "../domain/reports-filter-params";
import { useReports } from "../hooks/use-reports";

export const ReportsOverviewPage = () => {
  const {
    reports,
    filters,
    setFilters,
    plSummary,
    overdueList,
    isLoading,
    error,
  } = useReports();

  const handleExport = () => {
    toast.info("Chức năng xuất báo cáo", {
      description: "Tính năng sẽ được bổ sung trong phiên bản sau.",
    });
  };

  if (error) {
    return (
      <div className="space-y-6">
        <ErrorPanel
          title="Không thể tải báo cáo"
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
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Báo cáo</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Phân tích doanh thu, chi phí và hiệu suất quản lý.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="w-full sm:w-auto"
          >
            <Download className="mr-2 h-4 w-4" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Filters */}
      <ReportFilters
        filters={filters}
        onFiltersChange={(newFilters: ReportFilterParams) =>
          setFilters(newFilters)
        }
        onClearFilters={() => setFilters(defaultReportFilters)}
      />

      {/* KPI Cards */}
      <ReportKPICards
        totalRevenue={plSummary.totalRevenue}
        totalExpenses={plSummary.totalExpenses}
        profit={plSummary.totalProfit}
        avgOccupancy={plSummary.avgOccupancy}
      />

      {/* Report Tables */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* P&L Summary */}
        {reports.length > 0 ? (
          <ReportTable
            data={reports}
            title="Tổng hợp P&L"
            description="Doanh thu, chi phí và lợi nhuận theo tòa/tầng"
          />
        ) : (
          <EmptyPanel
            title="Không có dòng báo cáo"
            description="Thử đổi bộ lọc tòa, tầng hoặc trạng thái."
            action={{
              label: "Đặt lại bộ lọc",
              onClick: () => setFilters(defaultReportFilters),
            }}
          />
        )}

        {/* Overdue Debt */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertCircle className="h-4 w-4 text-red-600" />
              Danh sách công nợ quá hạn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {overdueList.length > 0 ? (
                overdueList.map((debt) => (
                  <div
                    key={debt.id}
                    className="rounded-lg border p-3 hover:bg-muted/50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{debt.tenant}</p>
                        <p className="text-sm text-muted-foreground">
                          {debt.room}
                        </p>
                        <p className="mt-1 text-xs text-red-600">
                          {debt.reason}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-red-600">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                            maximumFractionDigits: 0,
                          }).format(debt.amount)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Quá hạn {debt.daysOverdue} ngày
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <EmptyPanel
                  title="Không có công nợ quá hạn"
                  description="Danh sách trống trong kỳ báo cáo hiện tại."
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Reports */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Occupancy Efficiency */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Hiệu suất lấp đầy</CardTitle>
          </CardHeader>
          <CardContent>
            {reports.length > 0 ? (
              <div className="space-y-4">
                {reports.map((report) => (
                  <div
                    key={`${report.month}-${report.floor}`}
                    className="space-y-2"
                  >
                    <div className="flex justify-between text-sm">
                      <span>{report.floor}</span>
                      <span className="font-medium">
                        {report.occupancyRate}%
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${report.occupancyRate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Không có dữ liệu cho bộ lọc hiện tại.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Utility Consumption */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              So sánh tiêu thụ tiện ích
            </CardTitle>
          </CardHeader>
          <CardContent>
            {reports.length > 0 ? (
              <div className="space-y-4">
                {reports.map((report) => (
                  <div
                    key={`${report.month}-${report.floor}-util`}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="text-sm font-medium">{report.floor}</p>
                      <div className="mt-1 flex gap-4 text-xs text-muted-foreground">
                        <span>💧 {report.waterUsage} m³</span>
                        <span>⚡ {report.electricityUsage} kWh</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Không có dữ liệu cho bộ lọc hiện tại.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
