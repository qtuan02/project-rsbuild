import type { Task, TaskType } from "@/types/task";

import {
  priorityFilterOptions,
  statusFilterOptions,
  typeFilterOptions,
} from "./task-display-config";

export interface TaskFilterColumn {
  id: "priority" | "status" | "type";
  title: string;
  options: {
    label: string;
    value: string;
  }[];
}

export interface TaskFilterState {
  search: string;
  filters: Record<string, string[]>;
}

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

export const filterTasks = (
  tasks: Task[],
  filterState: TaskFilterState,
): Task[] => {
  let result = tasks;
  const normalizedSearch = filterState.search.trim().toLowerCase();

  if (normalizedSearch) {
    result = result.filter(
      (task) =>
        task.title.toLowerCase().includes(normalizedSearch) ||
        task.description.toLowerCase().includes(normalizedSearch),
    );
  }

  Object.entries(filterState.filters).forEach(([key, values]) => {
    if (values.length === 0) {
      return;
    }

    result = result.filter((task) => {
      const taskValue = task[key as keyof Task];
      return values.includes(String(taskValue));
    });
  });

  return result;
};

export const countTasksByType = (tasks: Task[]): Record<TaskType, number> => {
  return tasks.reduce<Record<TaskType, number>>(
    (accumulator, task) => {
      accumulator[task.type] += 1;
      return accumulator;
    },
    {
      invoice_overdue: 0,
      contract_expiring: 0,
      maintenance: 0,
    },
  );
};
