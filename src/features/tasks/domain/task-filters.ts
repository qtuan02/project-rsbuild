import {
  priorityFilterOptions,
  statusFilterOptions,
  typeFilterOptions,
} from "./task-display-config";

import type { ComponentType } from "react";

export interface TaskSearchColumn {
  id: "title" | "description";
  title: string;
}

export interface TaskFilterColumn {
  id: "priority" | "status" | "type";
  title: string;
  options: {
    label: string;
    value: string;
    icon?: ComponentType<{ className?: string }>;
  }[];
}

export const taskSearchColumns: TaskSearchColumn[] = [
  { id: "title", title: "tiêu đề" },
  { id: "description", title: "mô tả" },
];

export const taskFilterColumns: TaskFilterColumn[] = [
  {
    id: "priority",
    title: "Mức độ ưu tiên",
    options: priorityFilterOptions,
  },
  {
    id: "status",
    title: "Trạng thái",
    options: statusFilterOptions,
  },
  {
    id: "type",
    title: "Loại nhiệm vụ",
    options: typeFilterOptions,
  },
];
