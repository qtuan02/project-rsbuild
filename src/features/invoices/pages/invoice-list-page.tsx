import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Plus,
} from "lucide-react";
import * as React from "react";

import { ListPageHeader, ListPageShell } from "@/components/shared/list";
import {
  DataTableView,
  DataTablePagination,
  DataTableToolbar,
  useDataTable,
} from "@/components/shared/table";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/cn";
import { formatCurrency } from "@/utils/currency";

import { InvoiceCard } from "../components/invoice-card";
import { invoiceColumns } from "../components/invoice-columns";
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
  const { data, summaryStats, searchableColumns, filterableColumns } =
    useInvoiceList();
  const [activeTab, setActiveTab] = React.useState("grid");

  const { table } = useDataTable({
    data,
    columns: invoiceColumns,
    getRowId: (row) => row.id,
    initialPageSize: 6,
  });

  const rows = table.getRowModel().rows;
  const hasRows = rows.length > 0;

  return (
    <div className="space-y-6">
      <ListPageHeader
        title="Quản lý hóa đơn"
        description="Theo dõi và quản lý tất cả hóa đơn thanh toán từ khách thuê."
        actions={[
          {
            key: "export",
            label: "Xuất Excel",
            icon: <Download className="mr-2 h-4 w-4" />,
            variant: "outline",
          },
          {
            key: "create",
            label: "Tạo hóa đơn",
            icon: <Plus className="mr-2 h-4 w-4" />,
          },
        ]}
      />

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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <ListPageShell
          resultLabel={`${table.getFilteredRowModel().rows.length} hóa đơn được tìm thấy`}
          isFiltering={table.getState().columnFilters.length > 0}
          toolbar={
            <DataTableToolbar
              table={table}
              searchableColumns={searchableColumns}
              filterableColumns={filterableColumns}
              showViewOptions={activeTab === "table"}
            />
          }
          gridContent={
            <TabsContent value="grid" className="mt-0 outline-none">
              {hasRows ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {rows.map((row) => (
                    <InvoiceCard key={row.id} invoice={row.original} />
                  ))}
                </div>
              ) : (
                <DataTableView
                  table={table}
                  columns={invoiceColumns}
                  emptyIcon={FileText}
                  emptyTitle="Không tìm thấy hóa đơn"
                  emptyDescription="Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để xem kết quả."
                  resetFilters={() => table.resetColumnFilters()}
                />
              )}
            </TabsContent>
          }
          tableContent={
            <TabsContent value="table" className="mt-0 outline-none">
              <DataTableView
                table={table}
                columns={invoiceColumns}
                emptyIcon={FileText}
                emptyTitle="Không tìm thấy hóa đơn"
                emptyDescription="Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để xem kết quả."
                resetFilters={() => table.resetColumnFilters()}
              />
            </TabsContent>
          }
        />
      </Tabs>

      {hasRows && <DataTablePagination table={table} />}
    </div>
  );
};
