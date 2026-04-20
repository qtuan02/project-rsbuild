import { Download, Plus } from 'lucide-react';
import * as React from 'react';

import { DataTable } from '@/components/shared/table';
import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from '@/components/shared/table';
import { Button } from '@/components/ui/button';

import { mockRooms } from '../components/mock-data';
import {
  columns,
  statusFilterOptions,
  typeFilterOptions,
  type Room,
} from '../components/room-columns';

const searchableColumns: DataTableSearchableColumn<Room>[] = [
  { id: 'name', title: 'tên phòng' },
];

const filterableColumns: DataTableFilterableColumn<Room>[] = [
  {
    id: 'status',
    title: 'Trạng thái',
    options: statusFilterOptions,
  },
  {
    id: 'type',
    title: 'Loại phòng',
    options: typeFilterOptions,
  },
];

export const RoomListPage = () => {
  const [data, setData] = React.useState<Room[]>(mockRooms);

  const handleRowReorder = (oldIndex: number, newIndex: number) => {
    setData((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(oldIndex, 1);
      result.splice(newIndex, 0, removed);
      return result;
    });
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
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

      {/* Data table */}
      <DataTable
        columns={columns}
        data={data}
        searchableColumns={searchableColumns}
        filterableColumns={filterableColumns}
        enableRowDrag
        getRowId={(row) => row.id}
        onRowReorder={handleRowReorder}
      />
    </div>
  );
};
