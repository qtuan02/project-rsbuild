import { PaginationNavigation } from "./pagination-navigation";
import { PaginationPageSizeSelect } from "./pagination-page-size-select";

import type { ReactNode } from "react";

interface PaginationBarProps {
  leftContent: ReactNode;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  pageSizeOptions: number[];
  perPageLabel: string;
  onPageSizeChange: (value: number) => void;
  onPageChange: (page: number) => void;
  pageIndicator?: ReactNode;
  showFirstLast?: boolean;
  pageItems?: (number | "ellipsis")[];
  triggerClassName?: string;
  className?: string;
}

export const PaginationBar = ({
  leftContent,
  currentPage,
  totalPages,
  pageSize,
  pageSizeOptions,
  perPageLabel,
  onPageSizeChange,
  onPageChange,
  pageIndicator,
  showFirstLast = false,
  pageItems,
  triggerClassName,
  className = "flex flex-col items-center justify-between gap-4 px-2 sm:flex-row",
}: PaginationBarProps) => (
  <div className={className}>
    <div className="flex-1 text-sm text-muted-foreground">{leftContent}</div>

    <div className="flex items-center gap-4 lg:gap-6">
      <div className="flex items-center gap-2">
        <p className="whitespace-nowrap text-sm text-muted-foreground">
          {perPageLabel}
        </p>
        <PaginationPageSizeSelect
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          onPageSizeChange={onPageSizeChange}
          triggerClassName={triggerClassName}
        />
      </div>

      {pageIndicator}

      <PaginationNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        pageItems={pageItems}
        showFirstLast={showFirstLast}
      />
    </div>
  </div>
);
