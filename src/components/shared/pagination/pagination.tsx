type PageItem = number | 'ellipsis';
import { PaginationNavigation } from './pagination-navigation';
import { PaginationPageSizeSelect } from './pagination-page-size-select';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
  labels?: {
    showing: string;
    perPage: string;
  };
}

const DEFAULT_PAGE_SIZE_OPTIONS = [6, 9, 12, 18];
const MAX_VISIBLE_PAGES = 5;
const DEFAULT_LABELS = {
  showing: 'Hiển thị',
  perPage: 'Hiển thị:',
};

const getPageItems = (currentPage: number, totalPages: number): PageItem[] => {
  const pages: PageItem[] = [];

  if (totalPages <= MAX_VISIBLE_PAGES) {
    for (let index = 1; index <= totalPages; index += 1) {
      pages.push(index);
    }
    return pages;
  }

  pages.push(1);
  if (currentPage > 3) {
    pages.push('ellipsis');
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let index = start; index <= end; index += 1) {
    pages.push(index);
  }

  if (currentPage < totalPages - 2) {
    pages.push('ellipsis');
  }

  pages.push(totalPages);
  return pages;
};

export const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  labels = DEFAULT_LABELS,
}: PaginationProps) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  const pageItems = getPageItems(currentPage, totalPages);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <p className="text-sm text-muted-foreground">
          {labels.showing}{' '}
          <span className="font-medium text-foreground">
            {startItem}-{endItem}
          </span>{' '}
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
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        pageItems={pageItems}
      />
    </div>
  );
};
