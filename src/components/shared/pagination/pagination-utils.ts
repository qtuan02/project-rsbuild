type PageItem = number | "ellipsis";

const MAX_VISIBLE_PAGES = 5;

export const clampPage = (page: number, totalPages: number) => {
  const safeTotalPages = Math.max(1, totalPages);
  return Math.min(Math.max(1, page), safeTotalPages);
};

export const getPageItems = (
  currentPage: number,
  totalPages: number,
): PageItem[] => {
  const safeCurrentPage = clampPage(currentPage, totalPages);
  const safeTotalPages = Math.max(1, totalPages);
  const pages: PageItem[] = [];

  if (safeTotalPages <= MAX_VISIBLE_PAGES) {
    for (let index = 1; index <= safeTotalPages; index += 1) {
      pages.push(index);
    }
    return pages;
  }

  pages.push(1);
  if (safeCurrentPage > 3) {
    pages.push("ellipsis");
  }

  const start = Math.max(2, safeCurrentPage - 1);
  const end = Math.min(safeTotalPages - 1, safeCurrentPage + 1);

  for (let index = start; index <= end; index += 1) {
    pages.push(index);
  }

  if (safeCurrentPage < safeTotalPages - 2) {
    pages.push("ellipsis");
  }

  pages.push(safeTotalPages);
  return pages;
};
