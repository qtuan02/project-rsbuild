import { PaginationBar } from "./pagination-bar";
import {
  DEFAULT_PAGINATION_LABELS,
  DEFAULT_PAGINATION_PAGE_SIZE_OPTIONS,
  type PaginationLabels,
} from "./pagination-contracts";
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
    <PaginationBar
      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      leftContent={
        <div className="flex items-center gap-3">
          <p className="text-sm text-muted-foreground">
            {labels.showing}{" "}
            <span className="font-medium text-foreground">
              {startItem}-{endItem}
            </span>{" "}
            / <span className="font-medium text-foreground">{totalItems}</span>
          </p>
        </div>
      }
      currentPage={safeCurrentPage}
      totalPages={totalPages}
      pageSize={pageSize}
      pageSizeOptions={pageSizeOptions}
      perPageLabel={labels.perPage}
      onPageSizeChange={onPageSizeChange}
      onPageChange={onPageChange}
      pageItems={pageItems}
      triggerClassName="h-8 w-[70px]"
    />
  );
};
