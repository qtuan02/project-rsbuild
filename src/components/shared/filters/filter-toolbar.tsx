import { X } from "lucide-react";

import {
  DataTableFacetedFilter,
  type FacetedFilterColumn,
} from "@/components/shared/table/data-table-faceted-filter";
import { Button } from "@/components/ui/button";

import { createFacetedFilterColumn } from "./faceted-filter-column";
import { SearchInputWithClear } from "./search-input-with-clear";

import type { SharedFilterableColumn } from "./filter-contract";

interface FilterToolbarSearchField {
  id: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  inputClassName?: string;
}

interface FilterToolbarFacetedFilter extends SharedFilterableColumn {
  selectedValues: string[];
  onChange: (values: string[]) => void;
  column?: FacetedFilterColumn;
}

interface FilterToolbarProps {
  searchFields?: FilterToolbarSearchField[];
  facetedFilters?: FilterToolbarFacetedFilter[];
  controls?: React.ReactNode;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  clearLabel?: string;
}

export const FilterToolbar = ({
  searchFields = [],
  facetedFilters = [],
  controls,
  hasActiveFilters,
  onClearFilters,
  clearLabel = "Xóa bộ lọc",
}: FilterToolbarProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center mb-4">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {searchFields.map((field) => (
          <SearchInputWithClear
            key={field.id}
            value={field.value}
            placeholder={field.placeholder}
            onChange={field.onChange}
            inputClassName={field.inputClassName}
          />
        ))}

        {facetedFilters.map((filter) => (
          <DataTableFacetedFilter
            key={filter.id}
            column={
              filter.column ??
              createFacetedFilterColumn(filter.selectedValues, filter.onChange)
            }
            title={filter.title}
            options={filter.options}
          />
        ))}

        {controls}

        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={onClearFilters}
            className="h-8 px-2 text-xs lg:px-3"
          >
            {clearLabel}
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
