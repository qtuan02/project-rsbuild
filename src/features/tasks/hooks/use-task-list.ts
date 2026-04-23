import * as React from "react";

import type { Task } from "@/types/task";

import { getTasks } from "../data/task.repository";
import {
  taskFilterColumns,
  taskSearchColumns,
  type TaskFilterColumn,
  type TaskSearchColumn,
} from "../domain/task-filters";

export interface UseTaskListResult {
  data: Task[];
  searchableColumns: TaskSearchColumn[];
  filterableColumns: TaskFilterColumn[];
}

export const useTaskList = (): UseTaskListResult => {
  const [data] = React.useState<Task[]>(() => getTasks());

  const searchableColumns = React.useMemo(() => taskSearchColumns, []);

  const filterableColumns = React.useMemo(() => taskFilterColumns, []);

  return {
    data,
    searchableColumns,
    filterableColumns,
  };
};
