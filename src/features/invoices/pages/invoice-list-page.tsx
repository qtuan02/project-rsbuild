import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Plus,
} from "lucide-react";
import { useQueryState } from "nuqs";

import { ListPageHeader, ListPageShell } from "@/components/shared/list";
import { DEFAULT_PAGINATION_OPTIONS } from "@/components/shared/pagination/pagination-contracts";
import {
  DataTableView,
  DataTablePagination,
  DataTableToolbar,
  useDataTable,
} from "@/components/shared/table";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { STATUS_COLORS } from "@/config/colors";
import { cn } from "@/libs/cn";
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
    color: STATUS_COLORS.success.text,
    bg: STATUS_COLORS.success.bg,
  },
  {
    key: "pendingAmount",
    label: "Chờ thanh toán",
    icon: Clock,
    color: STATUS_COLORS.info.text,
    bg: STATUS_COLORS.info.bg,
  },
  {
    key: "overdueAmount",
    label: "Quá hạn",
    icon: AlertCircle,
    color: STATUS_COLORS.error.text,
    bg: STATUS_COLORS.error.bg,
  },
] as const;

export const InvoiceListPage = () => {
  const { data, summaryStats, searchableColumns, filterableColumns } =
    useInvoiceList();
  const [activeTab, setActiveTab] = useQueryState("activeTab", {
    defaultValue: "grid",
  });

  const { table } = useDataTable({
    data,
    columns: invoiceColumns,
    getRowId: (row) => row.id,
    initialPageSize: DEFAULT_PAGINATION_OPTIONS,
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
