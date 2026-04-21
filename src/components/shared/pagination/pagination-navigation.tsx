import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

type PageItem = number | 'ellipsis';

interface PaginationNavigationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageItems?: PageItem[];
  showFirstLast?: boolean;
  labels?: {
    firstPage: string;
    previousPage: string;
    nextPage: string;
    lastPage: string;
  };
}

const DEFAULT_LABELS = {
  firstPage: 'Trang đầu',
  previousPage: 'Trang trước',
  nextPage: 'Trang sau',
  lastPage: 'Trang cuối',
};

export const PaginationNavigation = ({
  currentPage,
  totalPages,
  onPageChange,
  pageItems,
  showFirstLast = false,
  labels = DEFAULT_LABELS,
}: PaginationNavigationProps) => {
  const resolvedTotalPages = Math.max(1, totalPages);
  const resolvedCurrentPage = Math.min(
    Math.max(1, currentPage),
    resolvedTotalPages,
  );
  const isFirstPage = resolvedCurrentPage <= 1;
  const isLastPage = resolvedCurrentPage >= resolvedTotalPages;

  const navigateTo = (page: number) => {
    const nextPage = Math.min(Math.max(1, page), resolvedTotalPages);
    onPageChange(nextPage);
  };

  return (
    <div className="flex items-center gap-1">
      {showFirstLast && (
        <Button
          variant="outline"
          size="icon-sm"
          disabled={isFirstPage}
          onClick={() => navigateTo(1)}
        >
          <span className="sr-only">{labels.firstPage}</span>
          <ChevronsLeft className="h-4 w-4" />
        </Button>
      )}

      <Button
        variant="outline"
        size="icon-sm"
        disabled={isFirstPage}
        onClick={() => navigateTo(resolvedCurrentPage - 1)}
      >
        <span className="sr-only">{labels.previousPage}</span>
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pageItems?.map((page, index) =>
        page === 'ellipsis' ? (
          <span
            key={`ellipsis-${index}`}
            className="flex h-7 w-7 items-center justify-center text-xs text-muted-foreground"
          >
            ...
          </span>
        ) : (
          <Button
            key={page}
            variant={resolvedCurrentPage === page ? 'default' : 'outline'}
            size="icon-sm"
            onClick={() => navigateTo(page)}
            className="h-7 w-7 text-xs"
          >
            {page}
          </Button>
        ),
      )}

      <Button
        variant="outline"
        size="icon-sm"
        disabled={isLastPage}
        onClick={() => navigateTo(resolvedCurrentPage + 1)}
      >
        <span className="sr-only">{labels.nextPage}</span>
        <ChevronRight className="h-4 w-4" />
      </Button>

      {showFirstLast && (
        <Button
          variant="outline"
          size="icon-sm"
          disabled={isLastPage}
          onClick={() => navigateTo(resolvedTotalPages)}
        >
          <span className="sr-only">{labels.lastPage}</span>
          <ChevronsRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
