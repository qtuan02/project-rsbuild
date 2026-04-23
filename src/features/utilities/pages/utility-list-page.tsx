import { flexRender } from "@tanstack/react-table";
import {
  Activity,
  AlertCircle,
  Clock,
  LayoutGrid,
  List,
  Plus,
} from "lucide-react";
import * as React from "react";

import { SummaryCard } from "@/components/shared/cards/summary-card";
import { EmptyPanel, LoadingPanel } from "@/components/shared/panels";
import {
  DataTablePagination,
  DataTableToolbar,
  useDataTable,
} from "@/components/shared/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tiện ích</h1>
          <p className="text-sm text-muted-foreground">
            Quản lý chỉ số điện nước và tiêu thụ hàng tháng.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            Lịch sử chốt
          </Button>
          <Button size="sm" className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Thêm chỉ số
          </Button>
        </div>
      </div>

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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-medium">
              {table.getFilteredRowModel().rows.length} chỉ số được tìm thấy
            </span>
            {table.getState().columnFilters.length > 0 && (
              <Badge variant="secondary" className="text-[10px]">
                Đang lọc
              </Badge>
            )}
          </div>
          <TabsList className="bg-muted/50">
            <TabsTrigger value="grid" className="gap-2 px-4">
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Dạng thẻ</span>
            </TabsTrigger>
            <TabsTrigger value="table" className="gap-2 px-4">
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
                <UtilityCard key={row.id} utility={row.original} />
              ))}
            </div>
          ) : (
            <div className="py-12 border-2 border-dashed rounded-xl">
              <EmptyPanel
                title="Không có dữ liệu"
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
                title="Không có dữ liệu"
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
