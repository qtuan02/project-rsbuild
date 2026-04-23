import { AlertCircle, Download } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ReportFilters } from "../components/report-filters";
import { ReportKPICards } from "../components/report-kpi-cards";
import { ReportTable } from "../components/report-table";
import { useReports } from "../hooks/use-reports";

import type { ReportFilterParams } from "../domain/reports-filter-params";

export const ReportsOverviewPage = () => {
  const { reports, filters, setFilters, plSummary, overdueList } = useReports();
  const [isLoading] = useState(false);

  const handleExport = () => {
    alert("Chức năng xuất báo cáo sẽ được thêm trong tương lai");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Báo cáo</h1>
          <p className="mt-2 text-muted-foreground">
            Phân tích doanh thu, chi phí và hiệu suất quản lý.
          </p>
        </div>
        <Button onClick={handleExport} className="gap-2">
          <Download className="h-4 w-4" />
          Xuất báo cáo
        </Button>
      </div>

      {/* Filters */}
      <ReportFilters
        filters={filters}
        onFiltersChange={(newFilters: ReportFilterParams) =>
          setFilters(newFilters)
        }
      />

      {/* KPI Cards */}
      {!isLoading && (
        <ReportKPICards
          totalRevenue={plSummary.totalRevenue}
          totalExpenses={plSummary.totalExpenses}
          profit={plSummary.totalProfit}
          avgOccupancy={plSummary.avgOccupancy}
        />
      )}

      {/* Report Tables */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* P&L Summary */}
        <ReportTable
          data={reports}
          title="Tổng hợp P&L"
          description="Doanh thu, chi phí và lợi nhuận theo tòa/tầng"
        />

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
                <p className="text-sm text-muted-foreground">
                  Không có công nợ quá hạn
                </p>
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
            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={`${report.month}-${report.floor}`}
                  className="space-y-2"
                >
                  <div className="flex justify-between text-sm">
                    <span>{report.floor}</span>
                    <span className="font-medium">{report.occupancyRate}%</span>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
