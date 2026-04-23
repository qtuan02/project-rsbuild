import { flexRender } from "@tanstack/react-table";
import {
  CheckCircle2,
  Clock,
  Download,
  LayoutGrid,
  List,
  Plus,
  UserCheck,
  Users,
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

import { AddTenantDialog } from "../components/add-tenant-dialog";
import { TenantCard } from "../components/tenant-card";
import { tenantColumns } from "../components/tenant-columns";
import { useTenantList } from "../hooks/use-tenant-list";

const summaryStatConfigs = [
  {
    key: "total",
    label: "Tổng khách",
    icon: Users,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    key: "active",
    label: "Đang thuê",
    icon: UserCheck,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  {
    key: "pending",
    label: "Chờ vào",
    icon: Clock,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    key: "overdue",
    label: "Nợ cước",
    icon: CheckCircle2,
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-100 dark:bg-red-900/30",
  },
] as const;

export const TenantListPage = () => {
  const { data, summaryStats, searchableColumns, filterableColumns } =
    useTenantList();
  const [activeTab, setActiveTab] = React.useState("grid");

  const { table } = useDataTable({
    data,
    columns: tenantColumns,
    getRowId: (row) => row.id,
    initialPageSize: 6,
  });

  const rows = table.getRowModel().rows;
  const hasRows = rows.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Quản lý khách thuê
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Theo dõi thông tin, trạng thái và hợp đồng của tất cả khách thuê.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Xuất Excel
          </Button>
          <AddTenantDialog>
            <Button size="sm" className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Thêm khách
            </Button>
          </AddTenantDialog>
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
                  {summaryStats[config.key]}
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
              {table.getFilteredRowModel().rows.length} khách thuê được tìm thấy
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
                <TenantCard key={row.id} tenant={row.original} />
              ))}
            </div>
          ) : (
            <div className="py-12 border-2 border-dashed rounded-xl">
              <EmptyPanel
                icon={Users}
                title="Không tìm thấy khách thuê"
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
                icon={Users}
                title="Không tìm thấy khách thuê"
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
