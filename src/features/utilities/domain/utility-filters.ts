import {
  statusFilterOptions,
  typeFilterOptions,
} from "./utility-display-config";

import type { ComponentType } from "react";

export interface UtilitySearchColumn {
  id: "roomName" | "month";
  title: string;
}

export interface UtilityFilterColumn {
  id: "status" | "type";
  title: string;
  options: {
    label: string;
    value: string;
    icon?: ComponentType<{ className?: string }>;
  }[];
}

export const utilitySearchColumns: UtilitySearchColumn[] = [
  { id: "roomName", title: "tên phòng" },
  { id: "month", title: "tháng" },
];

export const utilityFilterColumns: UtilityFilterColumn[] = [
  {
    id: "status",
    title: "Trạng thái",
    options: statusFilterOptions,
  },
  {
    id: "type",
    title: "Loại tiện ích",
    options: typeFilterOptions,
  },
];
