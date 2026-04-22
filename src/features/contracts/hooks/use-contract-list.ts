import * as React from "react";

import type { Contract } from "@/types/contract";

import { getContracts } from "../data/contract.repository";
import {
  contractFilterColumns,
  contractSearchColumns,
  type ContractFilterColumn,
  type ContractSearchColumn,
} from "../domain/contract-list-filters";

export interface UseContractListResult {
  data: Contract[];
  searchableColumns: ContractSearchColumn[];
  filterableColumns: ContractFilterColumn[];
  onRowReorder: (oldIndex: number, newIndex: number) => void;
}

export const useContractList = (): UseContractListResult => {
  const [data, setData] = React.useState<Contract[]>(() => getContracts());

  const searchableColumns = React.useMemo(() => contractSearchColumns, []);

  const filterableColumns = React.useMemo(() => contractFilterColumns, []);

  const onRowReorder = React.useCallback(
    (oldIndex: number, newIndex: number) => {
      setData((prev) => {
        const result = Array.from(prev);
        const [removed] = result.splice(oldIndex, 1);
        result.splice(newIndex, 0, removed);
        return result;
      });
    },
    [],
  );

  return {
    data,
    searchableColumns,
    filterableColumns,
    onRowReorder,
  };
};
