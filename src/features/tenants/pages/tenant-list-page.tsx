import {
  CheckCircle2,
  Clock,
  Download,
  Plus,
  UserCheck,
  Users,
} from "lucide-react";
import * as React from "react";

import { ListPageHeader, ListPageShell } from "@/components/shared/list";
import {
  DataTableView,
  DataTablePagination,
  DataTableToolbar,
  useDataTable,
} from "@/components/shared/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
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
      <ListPageHeader
        title="Quản lý khách thuê"
        description="Theo dõi thông tin, trạng thái và hợp đồng của tất cả khách thuê."
        actions={[
          {
            key: "export",
            label: "Xuất Excel",
            icon: <Download className="mr-2 h-4 w-4" />,
            variant: "outline",
          },
          {
            key: "add",
            label: "Thêm khách",
            node: (
              <AddTenantDialog>
                <Button size="sm" className="w-full sm:w-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm khách
                </Button>
              </AddTenantDialog>
            ),
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
                  {summaryStats[config.key]}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <ListPageShell
          resultLabel={`${table.getFilteredRowModel().rows.length} khách thuê được tìm thấy`}
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
                    <TenantCard key={row.id} tenant={row.original} />
                  ))}
                </div>
              ) : (
                <DataTableView
                  table={table}
                  columns={tenantColumns}
                  emptyIcon={Users}
                  emptyTitle="Không tìm thấy khách thuê"
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
                columns={tenantColumns}
                emptyIcon={Users}
                emptyTitle="Không tìm thấy khách thuê"
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
