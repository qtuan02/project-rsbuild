import * as React from "react";

import type { Utility } from "@/types/utility";

import { getUtilities } from "../data/utility.repository";
import {
  filterUtilities,
  type UtilityFilterState,
} from "../domain/utility-filters";
import {
  utilityFilterColumns,
  type UtilityFilterColumn,
} from "../domain/utility-filters";
import { calculateUtilityStats } from "../domain/utility-stats";

export interface UseUtilityListResult {
  data: Utility[];
  filteredData: Utility[];
  searchValue: string;
  filterValues: Record<string, string[]>;
  stats: ReturnType<typeof calculateUtilityStats>;
  filterableColumns: UtilityFilterColumn[];
  onSearchChange: (value: string) => void;
  onFilterChange: (filterId: string, values: string[]) => void;
  clearFilters: () => void;
}

export const useUtilityList = (): UseUtilityListResult => {
  const [data] = React.useState<Utility[]>(() => getUtilities());
  const [searchValue, setSearchValue] = React.useState("");
  const [filterValues, setFilterValues] = React.useState<
    Record<string, string[]>
  >({});

  const filterableColumns = React.useMemo(() => utilityFilterColumns, []);
  const stats = React.useMemo(() => calculateUtilityStats(data), [data]);
  const filterState = React.useMemo<UtilityFilterState>(
    () => ({ search: searchValue, filters: filterValues }),
    [filterValues, searchValue],
  );
  const filteredData = React.useMemo(
    () => filterUtilities(data, filterState),
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
    stats,
    filterableColumns,
    onSearchChange: setSearchValue,
    onFilterChange,
    clearFilters,
  };
};
