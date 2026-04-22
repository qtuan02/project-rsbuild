import {
  DEFAULT_DATA_TABLE_PAGINATION_LABELS,
  DEFAULT_DATA_TABLE_PAGE_SIZE_OPTIONS,
  type DataTablePaginationLabels,
  PaginationNavigation,
  PaginationPageSizeSelect,
} from "@/components/shared/pagination";
import { clampPage } from "@/components/shared/pagination/pagination-utils";

import type { Table } from "@tanstack/react-table";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
  labels?: DataTablePaginationLabels;
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = DEFAULT_DATA_TABLE_PAGE_SIZE_OPTIONS,
  labels = DEFAULT_DATA_TABLE_PAGINATION_LABELS,
}: DataTablePaginationProps<TData>) {
  const totalPages = table.getPageCount();
  const currentPage = clampPage(
    table.getState().pagination.pageIndex + 1,
    totalPages,
  );

  return (
    <div className="flex flex-col items-center justify-between gap-4 px-2 sm:flex-row">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <span>
            {labels.selected}{" "}
            <span className="font-medium text-foreground">
              {table.getFilteredSelectedRowModel().rows.length}
            </span>
            {" / "}
            <span className="font-medium text-foreground">
              {table.getFilteredRowModel().rows.length}
            </span>{" "}
            {labels.rows}
          </span>
        ) : (
          <span>
            {labels.total}{" "}
            <span className="font-medium text-foreground">
              {table.getFilteredRowModel().rows.length}
            </span>{" "}
            {labels.results}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground whitespace-nowrap">
            {labels.perPage}
          </p>
          <PaginationPageSizeSelect
            pageSize={table.getState().pagination.pageSize}
            pageSizeOptions={pageSizeOptions}
            onPageSizeChange={(value) => {
              table.setPageSize(value);
            }}
            triggerClassName="h-8 w-[70px]"
          />
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          {labels.page}{" "}
          <span className="mx-1 font-medium text-foreground">
            {currentPage}
          </span>
          /{" "}
          <span className="ml-1 font-medium text-foreground">{totalPages}</span>
        </div>

        <PaginationNavigation
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            table.setPageIndex(page - 1);
          }}
          showFirstLast
        />
      </div>
    </div>
  );
}
