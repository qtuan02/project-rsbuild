import { Download, LayoutGrid, List, Plus } from "lucide-react";

import { DataTable } from "@/components/shared/table";
import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/components/shared/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Room } from "@/types/room";

import { columns } from "../components/room-columns";
import { RoomGrid } from "../components/room-grid";
import { useRoomList } from "../hooks/use-room-list";

export const RoomListPage = () => {
  const { data, searchableColumns, filterableColumns, onRowReorder } =
    useRoomList();
  const tableSearchableColumns: DataTableSearchableColumn<Room>[] =
    searchableColumns;
  const tableFilterableColumns: DataTableFilterableColumn<Room>[] =
    filterableColumns;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Danh sách phòng trọ
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Quản lý toàn bộ phòng trọ, trạng thái và thông tin khách thuê.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Xuất Excel
          </Button>
          <Button size="sm" className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Thêm phòng
          </Button>
        </div>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="grid" className="gap-2">
              <LayoutGrid className="h-4 w-4" />
              Sơ đồ
            </TabsTrigger>
            <TabsTrigger value="table" className="gap-2">
              <List className="h-4 w-4" />
              Danh sách
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid" className="mt-0">
          <RoomGrid data={data} />
        </TabsContent>

        <TabsContent value="table" className="mt-0">
          <DataTable
            columns={columns}
            data={data}
            searchableColumns={tableSearchableColumns}
            filterableColumns={tableFilterableColumns}
            enableRowDrag
            getRowId={(row) => row.id}
            onRowReorder={onRowReorder}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
