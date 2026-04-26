import type { Room } from "@/types/room";

export const groupRoomsByFloor = (rooms: Room[]) =>
  rooms.reduce(
    (acc, room) => {
      const floor = room.floor || 1;
      if (!acc[floor]) {
        acc[floor] = [];
      }
      acc[floor].push(room);
      return acc;
    },
    {} as Record<number, Room[]>,
  );

export const getSortedFloors = (groupedByFloor: Record<number, Room[]>) =>
  Object.keys(groupedByFloor)
    .map(Number)
    .sort((a, b) => b - a);

export const sortRoomsByName = (rooms: Room[]) =>
  [...rooms].sort((a, b) => a.name.localeCompare(b.name));
