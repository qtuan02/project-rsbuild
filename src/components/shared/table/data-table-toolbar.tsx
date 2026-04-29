import { Settings2 } from "lucide-react";

import { FilterToolbar } from "@/components/shared/filters";
import type {
  SharedFilterableColumn,
  SharedSearchableColumn,
} from "@/components/shared/filters/filter-contract";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Table } from "@tanstack/react-table";

export type DataTableFilterableColumn<TData> = SharedFilterableColumn<
  keyof TData & string
>;

export type DataTableSearchableColumn<TData> = SharedSearchableColumn<
  keyof TData & string
>;

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterableColumns?: DataTableFilterableColumn<TData>[];
  searchableColumns?: DataTableSearchableColumn<TData>[];
  children?: React.ReactNode;
  showViewOptions?: boolean;
}

export function DataTableToolbar<TData>({
  table,
  filterableColumns = [],
  searchableColumns = [],
  children,
  showViewOptions = true,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const searchFields = searchableColumns
    .filter((column) => table.getColumn(column.id))
    .map((column) => ({
      id: column.id,
      placeholder: `Tìm ${column.title}...`,
      value: (table.getColumn(column.id)?.getFilterValue() as string) ?? "",
      onChange: (value: string) =>
        table.getColumn(column.id)?.setFilterValue(value),
      inputClassName: "w-36 lg:w-56",
    }));

  const facetedFilters = filterableColumns
    .filter((column) => table.getColumn(column.id))
    .map((column) => ({
      ...column,
      column: table.getColumn(column.id),
      selectedValues: (
        (table.getColumn(column.id)?.getFilterValue() as string[]) ?? []
      ).map(String),
      onChange: (values: string[]) =>
        table
          .getColumn(column.id)
          ?.setFilterValue(values.length ? values : undefined),
    }));

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <FilterToolbar
        searchFields={searchFields}
        facetedFilters={facetedFilters}
        hasActiveFilters={isFiltered}
        onClearFilters={() => table.resetColumnFilters()}
        clearLabel="Xóa bộ lọc"
      />

      <div className="flex items-center gap-2">
        {children}

        {/* Column visibility */}
        {showViewOptions && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Settings2 className="mr-2 h-4 w-4" />
                Hiển thị
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel>Chọn cột hiển thị</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide(),
                )
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onSelect={(e) => e.preventDefault()}
                    onCheckedChange={(checked) =>
                      column.toggleVisibility(!!checked)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
