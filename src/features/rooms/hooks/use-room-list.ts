import * as React from 'react';

import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from '@/components/shared/table';
import type { Room } from '@/types/room';

import { statusFilterOptions, typeFilterOptions } from '../constants/room';
import { getRooms } from '../data/room.repository';

export interface UseRoomListResult {
  data: Room[];
  searchableColumns: DataTableSearchableColumn<Room>[];
  filterableColumns: DataTableFilterableColumn<Room>[];
  onRowReorder: (oldIndex: number, newIndex: number) => void;
}

export const useRoomList = (): UseRoomListResult => {
  const [data, setData] = React.useState<Room[]>(() => getRooms());

  const searchableColumns = React.useMemo<DataTableSearchableColumn<Room>[]>(
    () => [{ id: 'name', title: 'tên phòng' }],
    [],
  );

  const filterableColumns = React.useMemo<DataTableFilterableColumn<Room>[]>(
    () => [
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
    ],
    [],
  );

  const onRowReorder = React.useCallback(
    (oldIndex: number, newIndex: number) => {
      setData((prev) => {
        const result = Array.from(prev);
        const [removed] = result.splice(oldIndex, 1);
        result.splice(newIndex, 0, removed);
        return result;
      });
    },
    [],
  );

  return {
    data,
    searchableColumns,
    filterableColumns,
    onRowReorder,
  };
};
