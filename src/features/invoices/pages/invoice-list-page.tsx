import {
  Download,
  FileText,
  Plus,
  LayoutGrid,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";

import { Pagination } from "@/components/shared/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import { formatCurrency } from "@/utils/currency";

import { InvoiceCard } from "../components/invoice-card";
import { InvoiceFilters } from "../components/invoice-filters";
import { useInvoiceList } from "../hooks/use-invoice-list";

const summaryStatConfigs = [
  {
    key: "total",
    label: "Tổng hóa đơn",
    icon: FileText,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    key: "paidAmount",
    label: "Đã thanh toán",
    icon: CheckCircle2,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  {
    key: "pendingAmount",
    label: "Chờ thanh toán",
    icon: Clock,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    key: "overdueAmount",
    label: "Quá hạn",
    icon: AlertCircle,
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-100 dark:bg-red-900/30",
  },
] as const;

export const InvoiceListPage = () => {
  const {
    search,
    statusFilter,
    monthFilter,
    currentPage,
    pageSize,
    totalPages,
    activeFilterCount,
    filteredCount,
    paginatedInvoices,
    summaryStats,
    onSearchChange,
    onStatusFilterValueChange,
    onMonthFilterValueChange,
    onPageChange,
    onPageSizeChange,
    clearFilters,
  } = useInvoiceList();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Quản lý hóa đơn</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Theo dõi và quản lý tất cả hóa đơn thanh toán từ khách thuê.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Xuất Excel
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Tạo hóa đơn
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {summaryStatConfigs.map((config) => (
          <Card key={config.label} size="sm">
            <CardContent className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                  config.bg,
                )}
              >
                <config.icon className={cn("h-4 w-4", config.color)} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{config.label}</p>
                <p className="text-xl font-bold tabular-nums">
                  {config.key === "total"
                    ? summaryStats[config.key]
                    : formatCurrency(summaryStats[config.key])}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <InvoiceFilters
        search={search}
        onSearchChange={onSearchChange}
        statusFilter={statusFilter}
        onStatusFilterValueChange={onStatusFilterValueChange}
        monthFilter={monthFilter}
        onMonthFilterValueChange={onMonthFilterValueChange}
        activeFilterCount={activeFilterCount}
        onClearFilters={clearFilters}
      />

      <div className="flex items-center gap-2">
        <LayoutGrid className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          {filteredCount} hóa đơn
        </span>
        {activeFilterCount > 0 && (
          <Badge variant="secondary" className="text-xs">
            {activeFilterCount} bộ lọc đang áp dụng
          </Badge>
        )}
      </div>

      {paginatedInvoices.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {paginatedInvoices.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card/50 p-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <FileText className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-base font-semibold">
            Không tìm thấy hóa đơn
          </h3>
          <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
            Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để xem thêm kết quả.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={clearFilters}
          >
            Xóa bộ lọc
          </Button>
        </div>
      )}

      {filteredCount > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={filteredCount}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </div>
  );
};
