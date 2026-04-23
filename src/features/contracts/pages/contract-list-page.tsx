import { flexRender } from "@tanstack/react-table";
import { Download, FileText, LayoutGrid, List, Plus } from "lucide-react";
import * as React from "react";

import { EmptyPanel } from "@/components/shared/panels";
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

import { ContractCard } from "../components/contract-card";
import { columns } from "../components/contract-columns";
import { useContractList } from "../hooks/use-contract-list";

export const ContractListPage = () => {
  const { data, searchableColumns, filterableColumns } = useContractList();
  const [activeTab, setActiveTab] = React.useState("grid");

  const { table } = useDataTable({
    data,
    columns,
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
            Quản lý hợp đồng
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Theo dõi toàn bộ hợp đồng thuê trọ, thời hạn và trạng thái.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Xuất Excel
          </Button>
          <Button size="sm" className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Thêm hợp đồng
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-medium">
              {table.getFilteredRowModel().rows.length} hợp đồng được tìm thấy
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
                <ContractCard key={row.id} contract={row.original} />
              ))}
            </div>
          ) : (
            <div className="py-12 border-2 border-dashed rounded-xl">
              <EmptyPanel
                icon={FileText}
                title="Không tìm thấy hợp đồng"
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
                title="Không tìm thấy hợp đồng"
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
