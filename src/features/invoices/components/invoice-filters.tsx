import { Search, X } from "lucide-react";

import {
  DataTableFacetedFilter,
  type FacetedFilterColumn,
} from "@/components/shared/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { InvoiceStatus } from "@/types/invoice";

import { statusFilterOptions } from "../domain/invoice-display-config";
import {
  getMonthOptions,
  type MonthFilter,
} from "../domain/invoice-filter-params";

interface InvoiceFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: InvoiceStatus[];
  onStatusFilterValueChange: (value: unknown) => void;
  monthFilter: MonthFilter[];
  onMonthFilterValueChange: (value: unknown) => void;
  activeFilterCount: number;
  onClearFilters: () => void;
}

export const InvoiceFilters = ({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterValueChange,
  monthFilter,
  onMonthFilterValueChange,
  activeFilterCount,
  onClearFilters,
}: InvoiceFiltersProps) => {
  const statusColumn: FacetedFilterColumn = {
    getFilterValue: () => (statusFilter.length > 0 ? statusFilter : undefined),
    setFilterValue: onStatusFilterValueChange,
    getFacetedUniqueValues: () => new Map(),
  };

  const monthColumn: FacetedFilterColumn = {
    getFilterValue: () => (monthFilter.length > 0 ? monthFilter : undefined),
    setFilterValue: onMonthFilterValueChange,
    getFacetedUniqueValues: () => new Map(),
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
          <Input
            placeholder="Tìm hóa đơn..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-8 w-40 pl-7 lg:w-64"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground/60 transition-colors hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        <DataTableFacetedFilter
          column={statusColumn}
          title="Trạng thái"
          options={statusFilterOptions}
        />

        <DataTableFacetedFilter
          column={monthColumn}
          title="Tháng"
          options={[...getMonthOptions()]}
        />

        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            onClick={onClearFilters}
            className="h-8 px-2 text-xs lg:px-3"
          >
            Xóa bộ lọc
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
