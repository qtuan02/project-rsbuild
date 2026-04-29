import { Download, FileText, Plus } from "lucide-react";
import { useQueryState } from "nuqs";

import { ListPageHeader, ListPageShell } from "@/components/shared/list";
import { DEFAULT_PAGINATION_OPTIONS } from "@/components/shared/pagination/pagination-contracts";
import {
  DataTableView,
  DataTablePagination,
  DataTableToolbar,
  useDataTable,
} from "@/components/shared/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import { columns } from "../components/room-columns";
import { RoomGrid } from "../components/room-grid";
import { useRoomList } from "../hooks/use-room-list";

export const RoomListPage = () => {
  const { data, searchableColumns, filterableColumns, onRowReorder } =
    useRoomList();
  const [activeTab, setActiveTab] = useQueryState("activeTab", {
    defaultValue: "grid",
  });

  const { table } = useDataTable({
    data,
    columns,
    getRowId: (row) => row.id,
    initialPageSize: DEFAULT_PAGINATION_OPTIONS,
  });

  const rows = table.getRowModel().rows;
  const hasRows = rows.length > 0;

  return (
    <div className="space-y-6">
      <ListPageHeader
        title="Danh sách phòng trọ"
        description="Quản lý toàn bộ phòng trọ, trạng thái và thông tin khách thuê."
        actions={[
          {
            key: "export",
            label: "Xuất Excel",
            icon: <Download className="mr-2 h-4 w-4" />,
            variant: "outline",
          },
          {
            key: "add",
            label: "Thêm phòng",
            icon: <Plus className="mr-2 h-4 w-4" />,
          },
        ]}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <ListPageShell
          resultLabel={`${table.getFilteredRowModel().rows.length} phòng được tìm thấy`}
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
                <RoomGrid data={rows.map((row) => row.original)} />
              ) : (
                <DataTableView
                  table={table}
                  columns={columns}
                  emptyIcon={FileText}
                  emptyTitle="Không tìm thấy phòng"
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
                emptyTitle="Không tìm thấy phòng"
                emptyDescription="Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để xem kết quả."
                resetFilters={() => table.resetColumnFilters()}
                enableRowDrag
                onRowReorder={onRowReorder}
              />
            </TabsContent>
          }
        />
      </Tabs>

      {hasRows && <DataTablePagination table={table} />}
    </div>
  );
};
