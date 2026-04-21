import { Download, Plus } from 'lucide-react';

import { DataTable } from '@/components/shared/table';
import { Button } from '@/components/ui/button';

import { columns } from '../components/room-columns';
import { useRoomList } from '../hooks/use-room-list';

export const RoomListPage = () => {
  const { data, searchableColumns, filterableColumns, onRowReorder } =
    useRoomList();

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
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Xuất Excel
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Thêm phòng
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data}
        searchableColumns={searchableColumns}
        filterableColumns={filterableColumns}
        enableRowDrag
        getRowId={(row) => row.id}
        onRowReorder={onRowReorder}
      />
    </div>
  );
};
