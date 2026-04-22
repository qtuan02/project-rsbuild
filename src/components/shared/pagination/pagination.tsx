import {
  DEFAULT_PAGINATION_LABELS,
  DEFAULT_PAGINATION_PAGE_SIZE_OPTIONS,
  type PaginationLabels,
} from "./pagination-contracts";
import { PaginationNavigation } from "./pagination-navigation";
import { PaginationPageSizeSelect } from "./pagination-page-size-select";
import { clampPage, getPageItems } from "./pagination-utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
  labels?: PaginationLabels;
}

export const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = DEFAULT_PAGINATION_PAGE_SIZE_OPTIONS,
  labels = DEFAULT_PAGINATION_LABELS,
}: PaginationProps) => {
  const safeCurrentPage = clampPage(currentPage, totalPages);
  const startItem = totalItems === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const endItem = Math.min(safeCurrentPage * pageSize, totalItems);
  const pageItems = getPageItems(safeCurrentPage, totalPages);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <p className="text-sm text-muted-foreground">
          {labels.showing}{" "}
          <span className="font-medium text-foreground">
            {startItem}-{endItem}
          </span>{" "}
          / <span className="font-medium text-foreground">{totalItems}</span>
        </p>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground">
            {labels.perPage}
          </span>
          <PaginationPageSizeSelect
            pageSize={pageSize}
            pageSizeOptions={pageSizeOptions}
            onPageSizeChange={onPageSizeChange}
          />
        </div>
      </div>

      <PaginationNavigation
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        pageItems={pageItems}
      />
    </div>
  );
};
