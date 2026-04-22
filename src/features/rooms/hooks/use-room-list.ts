import * as React from "react";

import type { Room } from "@/types/room";

import { getRooms } from "../data/room.repository";
import {
  roomFilterColumns,
  roomSearchColumns,
  type RoomFilterColumn,
  type RoomSearchColumn,
} from "../domain/room-list-filters";

export interface UseRoomListResult {
  data: Room[];
  searchableColumns: RoomSearchColumn[];
  filterableColumns: RoomFilterColumn[];
  onRowReorder: (oldIndex: number, newIndex: number) => void;
}

export const useRoomList = (): UseRoomListResult => {
  const [data, setData] = React.useState<Room[]>(() => getRooms());

  const searchableColumns = React.useMemo(() => roomSearchColumns, []);

  const filterableColumns = React.useMemo(() => roomFilterColumns, []);

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
