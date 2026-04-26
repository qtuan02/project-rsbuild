import { useMemo } from "react";

import type { Room } from "@/types/room";

import {
  getSortedFloors,
  groupRoomsByFloor,
  sortRoomsByName,
} from "../domain/room-grouping";

export const useGroupedRooms = (rooms: Room[]) =>
  useMemo(() => {
    const groupedByFloor = groupRoomsByFloor(rooms);
    const sortedFloors = getSortedFloors(groupedByFloor);
    const sortedRoomsByFloor = sortedFloors.reduce(
      (acc, floor) => {
        acc[floor] = sortRoomsByName(groupedByFloor[floor] ?? []);
        return acc;
      },
      {} as Record<number, Room[]>,
    );

    return {
      groupedByFloor: sortedRoomsByFloor,
      sortedFloors,
    };
  }, [rooms]);
