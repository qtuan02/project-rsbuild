import * as React from "react";

import type { Task } from "@/types/task";

import { getTasks } from "../data/task.repository";
import {
  countTasksByType,
  filterTasks,
  taskFilterColumns,
  type TaskFilterState,
  type TaskFilterColumn,
} from "../domain/task-filters";

export interface UseTaskListResult {
  data: Task[];
  filteredData: Task[];
  searchValue: string;
  filterValues: Record<string, string[]>;
  taskCountByType: ReturnType<typeof countTasksByType>;
  filterableColumns: TaskFilterColumn[];
  onSearchChange: (value: string) => void;
  onFilterChange: (filterId: string, values: string[]) => void;
  clearFilters: () => void;
}

export const useTaskList = (): UseTaskListResult => {
  const [data] = React.useState<Task[]>(() => getTasks());
  const [searchValue, setSearchValue] = React.useState("");
  const [filterValues, setFilterValues] = React.useState<
    Record<string, string[]>
  >({});

  const filterableColumns = React.useMemo(() => taskFilterColumns, []);
  const taskCountByType = React.useMemo(() => countTasksByType(data), [data]);
  const filterState = React.useMemo<TaskFilterState>(
    () => ({ search: searchValue, filters: filterValues }),
    [filterValues, searchValue],
  );
  const filteredData = React.useMemo(
    () => filterTasks(data, filterState),
    [data, filterState],
  );

  const onFilterChange = React.useCallback(
    (filterId: string, values: string[]) => {
      setFilterValues((previous) => ({
        ...previous,
        [filterId]: values,
      }));
    },
    [],
  );

  const clearFilters = React.useCallback(() => {
    setSearchValue("");
    setFilterValues({});
  }, []);

  return {
    data,
    filteredData,
    searchValue,
    filterValues,
    taskCountByType,
    filterableColumns,
    onSearchChange: setSearchValue,
    onFilterChange,
    clearFilters,
  };
};
