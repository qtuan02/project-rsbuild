import * as React from "react";

import type { Utility } from "@/types/utility";

import { getUtilities } from "../data/utility.repository";
import {
  utilityFilterColumns,
  utilitySearchColumns,
  type UtilityFilterColumn,
  type UtilitySearchColumn,
} from "../domain/utility-filters";

export interface UseUtilityListResult {
  data: Utility[];
  searchableColumns: UtilitySearchColumn[];
  filterableColumns: UtilityFilterColumn[];
}

export const useUtilityList = (): UseUtilityListResult => {
  const [data] = React.useState<Utility[]>(() => getUtilities());

  const searchableColumns = React.useMemo(() => utilitySearchColumns, []);

  const filterableColumns = React.useMemo(() => utilityFilterColumns, []);

  return {
    data,
    searchableColumns,
    filterableColumns,
  };
};
