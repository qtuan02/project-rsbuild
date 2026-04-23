import { flexRender } from "@tanstack/react-table";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  LayoutGrid,
  List,
  Plus,
} from "lucide-react";
import * as React from "react";

import { EmptyPanel } from "@/components/shared/panels";
import {
  DataTablePagination,
  DataTableToolbar,
  useDataTable,
} from "@/components/shared/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Quản lý hóa đơn</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Theo dõi và quản lý tất cả hóa đơn thanh toán từ khách thuê.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Xuất Excel
          </Button>
          <Button size="sm" className="w-full sm:w-auto">
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-medium">
              {table.getFilteredRowModel().rows.length} hóa đơn được tìm thấy
            </span>
            {table.getState().columnFilters.length > 0 && (
              <Badge variant="secondary" className="text-[10px]">
                Đang lọc
              </Badge>
            )}
          </div>
          <TabsList className="bg-muted/50">
            <TabsTrigger value="grid" className="gap-2">
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Dạng thẻ</span>
            </TabsTrigger>
            <TabsTrigger value="table" className="gap-2">
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">Dạng bảng</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <DataTableToolbar
          table={table}
          searchableColumns={searchableColumns}
          filterableColumns={filterableColumns}
          showViewOptions={activeTab === "table"}
        />

        <TabsContent value="grid" className="mt-0 outline-none">
          {hasRows ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rows.map((row) => (
                <InvoiceCard key={row.id} invoice={row.original} />
              ))}
            </div>
          ) : (
            <div className="py-12 border-2 border-dashed rounded-xl">
              <EmptyPanel
                icon={FileText}
                title="Không tìm thấy hóa đơn"
                description="Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để xem kết quả."
                action={{
                  label: "Xóa toàn bộ bộ lọc",
                  onClick: () => table.resetColumnFilters(),
                }}
              />
            </div>
          )}
        </TabsContent>

        <TabsContent value="table" className="mt-0 outline-none">
          {hasRows ? (
            <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow
                      key={headerGroup.id}
                      className="bg-muted/40 hover:bg-muted/40"
                    >
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="py-12 border-2 border-dashed rounded-xl">
              <EmptyPanel
                icon={FileText}
                title="Không tìm thấy hóa đơn"
                description="Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để xem kết quả."
                action={{
                  label: "Xóa toàn bộ bộ lọc",
                  onClick: () => table.resetColumnFilters(),
                }}
              />
            </div>
          )}
        </TabsContent>
      </Tabs>

      {hasRows && <DataTablePagination table={table} />}
    </div>
  );
};
