import type { Utility } from "@/types/utility";

import {
  statusFilterOptions,
  typeFilterOptions,
} from "./utility-display-config";

export interface UtilityFilterColumn {
  id: "status" | "type";
  title: string;
  options: {
    label: string;
    value: string;
  }[];
}

export interface UtilityFilterState {
  search: string;
  filters: Record<string, string[]>;
}

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

export const filterUtilities = (
  utilities: Utility[],
  filterState: UtilityFilterState,
): Utility[] => {
  let result = utilities;
  const normalizedSearch = filterState.search.trim().toLowerCase();

  if (normalizedSearch) {
    result = result.filter(
      (utility) =>
        utility.roomName.toLowerCase().includes(normalizedSearch) ||
        utility.month.includes(normalizedSearch),
    );
  }

  Object.entries(filterState.filters).forEach(([key, values]) => {
    if (values.length === 0) {
      return;
    }

    result = result.filter((utility) => {
      const utilityValue = utility[key as keyof Utility];
      return values.includes(String(utilityValue));
    });
  });

  return result;
};
