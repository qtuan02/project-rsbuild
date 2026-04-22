import { statusFilterOptions, typeFilterOptions } from "./room-display-config";

import type { ComponentType } from "react";

export interface RoomSearchColumn {
  id: "name";
  title: string;
}

export interface RoomFilterColumn {
  id: "status" | "type";
  title: string;
  options: {
    label: string;
    value: string;
    icon?: ComponentType<{ className?: string }>;
  }[];
}

export const roomSearchColumns: RoomSearchColumn[] = [
  { id: "name", title: "tên phòng" },
];

export const roomFilterColumns: RoomFilterColumn[] = [
  {
    id: "status",
    title: "Trạng thái",
    options: statusFilterOptions,
  },
  {
    id: "type",
    title: "Loại phòng",
    options: typeFilterOptions,
  },
];
