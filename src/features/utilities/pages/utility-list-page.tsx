import { Activity, AlertCircle, Clock, Plus } from "lucide-react";
import * as React from "react";

import { SummaryCard } from "@/components/shared/cards/summary-card";
import { ListPageHeader, ListPageShell } from "@/components/shared/list";
import { LoadingPanel } from "@/components/shared/panels";
import {
  DataTableView,
  DataTablePagination,
  DataTableToolbar,
  useDataTable,
} from "@/components/shared/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import { UtilityCard } from "../components/utility-card";
import { utilityColumns } from "../components/utility-columns";
import { useUtilityList } from "../hooks/use-utility-list";

export const UtilityListPage = () => {
  const { data, stats, searchableColumns, filterableColumns } =
    useUtilityList();
  const [activeTab, setActiveTab] = React.useState("grid");

  const { table } = useDataTable({
    data,
    columns: utilityColumns,
    getRowId: (row) => row.id,
    initialPageSize: 6,
  });

  const isLoading = false;

  if (isLoading) {
    return <LoadingPanel />;
  }

  const rows = table.getRowModel().rows;
  const hasRows = rows.length > 0;

  return (
    <div className="space-y-6">
      <ListPageHeader
        title="Tiện ích"
        description="Quản lý chỉ số điện nước và tiêu thụ hàng tháng."
        actions={[
          {
            key: "history",
            label: "Lịch sử chốt",
            variant: "outline",
          },
          {
            key: "add",
            label: "Thêm chỉ số",
            icon: <Plus className="mr-2 h-4 w-4" />,
          },
        ]}
      />

      {/* KPI Summary Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          label="Tổng chỉ số"
          value={stats.totalReadings.toString()}
          icon={Activity}
          className="hover:shadow-md transition-shadow"
        />
        <SummaryCard
          label="Bất thường"
          value={stats.anomalyCount.toString()}
          icon={AlertCircle}
          bgColor="bg-red-50 dark:bg-red-900/20"
          iconColor="text-red-600 dark:text-red-400"
          className="hover:shadow-md transition-shadow"
        />
        <SummaryCard
          label="Chờ xác minh"
          value={stats.pendingVerifyCount.toString()}
          icon={Clock}
          bgColor="bg-blue-50 dark:bg-blue-900/20"
          iconColor="text-blue-600 dark:text-blue-400"
          className="hover:shadow-md transition-shadow lg:col-span-1 sm:col-span-2"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <ListPageShell
          resultLabel={`${table.getFilteredRowModel().rows.length} chỉ số được tìm thấy`}
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
                    <UtilityCard key={row.id} utility={row.original} />
                  ))}
                </div>
              ) : (
                <DataTableView
                  table={table}
                  columns={utilityColumns}
                  emptyTitle="Không có dữ liệu"
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
                columns={utilityColumns}
                emptyTitle="Không có dữ liệu"
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
