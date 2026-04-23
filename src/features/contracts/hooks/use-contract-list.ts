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
}

export const useContractList = (): UseContractListResult => {
  const [data] = React.useState<Contract[]>(() => getContracts());

  const searchableColumns = React.useMemo(() => contractSearchColumns, []);

  const filterableColumns = React.useMemo(() => contractFilterColumns, []);

  return {
    data,
    searchableColumns,
    filterableColumns,
  };
};
