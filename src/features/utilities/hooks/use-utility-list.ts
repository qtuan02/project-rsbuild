import * as React from "react";

import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/components/shared/table";
import type { Utility } from "@/types/utility";

import { getUtilities } from "../data/utility.repository";
import {
  utilityFilterColumns,
  utilitySearchColumns,
} from "../domain/utility-filters";
import { calculateUtilityStats } from "../domain/utility-stats";

export interface UseUtilityListResult {
  data: Utility[];
  stats: ReturnType<typeof calculateUtilityStats>;
  searchableColumns: DataTableSearchableColumn<Utility>[];
  filterableColumns: DataTableFilterableColumn<Utility>[];
}

export const useUtilityList = (): UseUtilityListResult => {
  const [data] = React.useState<Utility[]>(() => getUtilities());

  const stats = React.useMemo(() => calculateUtilityStats(data), [data]);
  const searchableColumns = React.useMemo(
    () => utilitySearchColumns as DataTableSearchableColumn<Utility>[],
    [],
  );
  const filterableColumns = React.useMemo(
    () => utilityFilterColumns as DataTableFilterableColumn<Utility>[],
    [],
  );

  return {
    data,
    stats,
    searchableColumns,
    filterableColumns,
  };
};
