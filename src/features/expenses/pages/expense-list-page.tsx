import { Activity, Plus, Receipt, FileText } from "lucide-react";
import * as React from "react";

import { ListPageHeader, ListPageShell } from "@/components/shared/list";
import {
  DataTableView,
  DataTablePagination,
  DataTableToolbar,
  useDataTable,
  type DataTableSearchableColumn,
} from "@/components/shared/table";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/cn";
import { STATUS_COLORS } from "@/config/colors";
import { formatCurrency } from "@/utils/currency";

import { expenseColumns } from "../components/expense-columns";
import { useExpenseList } from "../hooks/use-expense-list";

const summaryStatConfigs = [
  {
    key: "totalAmount",
    label: "Tổng chi",
    icon: Receipt,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    key: "totalCount",
    label: "Số phiếu chi",
    icon: Activity,
    color: STATUS_COLORS.info.light.text,
    bg: STATUS_COLORS.info.light.bg,
  },
  {
    key: "averageAmount",
    label: "Trung bình / khoản",
    icon: Receipt,
    color: STATUS_COLORS.warning.light.text,
    bg: STATUS_COLORS.warning.light.bg,
  },
] as const;

export const ExpenseListPage = () => {
  const { expenses, stats } = useExpenseList();
  const [activeTab, setActiveTab] = React.useState("table");

  const { table } = useDataTable({
    data: expenses,
    columns: expenseColumns,
    initialPageSize: 10,
  });

  const searchableColumns: DataTableSearchableColumn<
    (typeof expenses)[number]
  >[] = [
    { id: "category", title: "danh mục" },
    { id: "description", title: "mô tả" },
  ];

  const rows = table.getRowModel().rows;
  const hasRows = rows.length > 0;

  return (
    <div className="space-y-6">
      <ListPageHeader
        title="Chi phí vận hành"
        description="Theo dõi các khoản chi nội bộ, bảo trì và vận hành theo từng tòa nhà."
        actions={[
          {
            key: "create-expense",
            label: "Thêm chi phí",
            icon: <Plus className="mr-2 h-4 w-4" />,
          },
        ]}
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
                  {config.key === "totalCount"
                    ? stats[config.key]
                    : formatCurrency(stats[config.key as "totalAmount" | "averageAmount"])}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <ListPageShell
          resultLabel={`${table.getFilteredRowModel().rows.length} phiếu chi được tìm thấy`}
          isFiltering={table.getState().columnFilters.length > 0}
          toolbar={
            <DataTableToolbar
              table={table}
              searchableColumns={searchableColumns}
              showViewOptions={activeTab === "table"}
            />
          }
          gridContent={<div />}
          tableContent={
            <TabsContent value="table" className="mt-0 outline-none">
              {hasRows ? (
                <DataTableView
                  table={table}
                  columns={expenseColumns}
                  emptyIcon={FileText}
                  emptyTitle="Không tìm thấy phiếu chi"
                  emptyDescription="Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để xem kết quả."
                  resetFilters={() => table.resetColumnFilters()}
                />
              ) : (
                <DataTableView
                  table={table}
                  columns={expenseColumns}
                  emptyIcon={FileText}
                  emptyTitle="Không tìm thấy phiếu chi"
                  emptyDescription="Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để xem kết quả."
                  resetFilters={() => table.resetColumnFilters()}
                />
              )}
            </TabsContent>
          }
        />
      </Tabs>

      {hasRows && <DataTablePagination table={table} />}
    </div>
  );
};
