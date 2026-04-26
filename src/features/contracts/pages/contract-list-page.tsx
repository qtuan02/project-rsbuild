import { Download, FileText, Plus } from "lucide-react";
import * as React from "react";

import { ListPageHeader, ListPageShell } from "@/components/shared/list";
import {
  DataTableView,
  DataTablePagination,
  DataTableToolbar,
  useDataTable,
} from "@/components/shared/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";

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
      <ListPageHeader
        title="Quản lý hợp đồng"
        description="Theo dõi toàn bộ hợp đồng thuê trọ, thời hạn và trạng thái."
        actions={[
          {
            key: "export",
            label: "Xuất Excel",
            icon: <Download className="mr-2 h-4 w-4" />,
            variant: "outline",
          },
          {
            key: "add",
            label: "Thêm hợp đồng",
            icon: <Plus className="mr-2 h-4 w-4" />,
          },
        ]}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <ListPageShell
          resultLabel={`${table.getFilteredRowModel().rows.length} hợp đồng được tìm thấy`}
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
                    <ContractCard key={row.id} contract={row.original} />
                  ))}
                </div>
              ) : (
                <DataTableView
                  table={table}
                  columns={columns}
                  emptyIcon={FileText}
                  emptyTitle="Không tìm thấy hợp đồng"
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
                columns={columns}
                emptyIcon={FileText}
                emptyTitle="Không tìm thấy hợp đồng"
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
