import { Settings2, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

import { DataTableFacetedFilter } from './data-table-faceted-filter';

import type { Table } from '@tanstack/react-table';

export interface DataTableFilterableColumn<TData> {
  id: keyof TData & string;
  title: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData & string;
  title: string;
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterableColumns?: DataTableFilterableColumn<TData>[];
  searchableColumns?: DataTableSearchableColumn<TData>[];
  children?: React.ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  filterableColumns = [],
  searchableColumns = [],
  children,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {/* Search inputs */}
        {searchableColumns.map((column) =>
          table.getColumn(column.id) ? (
            <Input
              key={column.id}
              placeholder={`Tìm ${column.title}...`}
              value={
                (table.getColumn(column.id)?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table.getColumn(column.id)?.setFilterValue(event.target.value)
              }
              className="h-8 w-36 lg:w-56"
            />
          ) : null,
        )}

        {/* Faceted filter buttons */}
        {filterableColumns.map((column) =>
          table.getColumn(column.id) ? (
            <DataTableFacetedFilter
              key={column.id}
              column={table.getColumn(column.id)}
              title={column.title}
              options={column.options}
            />
          ) : null,
        )}

        {/* Reset filters */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Xóa bộ lọc
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {children}

        {/* Column visibility */}
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
                  typeof column.accessorFn !== 'undefined' &&
                  column.getCanHide(),
              )
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
