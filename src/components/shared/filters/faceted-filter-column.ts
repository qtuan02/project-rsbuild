import type { FacetedFilterColumn } from "@/components/shared/table";

const toStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
};

export const createFacetedFilterColumn = (
  selectedValues: string[] | undefined,
  onChange: (values: string[]) => void,
): FacetedFilterColumn => ({
  getFilterValue: () =>
    selectedValues && selectedValues.length > 0 ? selectedValues : undefined,
  setFilterValue: (value) => {
    onChange(toStringArray(value));
  },
  getFacetedUniqueValues: () => new Map(),
});
