export interface PaginationLabels {
  showing: string;
  perPage: string;
}

export interface DataTablePaginationLabels {
  selected: string;
  rows: string;
  total: string;
  results: string;
  perPage: string;
  page: string;
}

export const DEFAULT_PAGINATION_PAGE_SIZE_OPTIONS = [6, 9, 12, 18];
export const DEFAULT_DATA_TABLE_PAGE_SIZE_OPTIONS = [10, 20, 30, 50];

export const DEFAULT_PAGINATION_LABELS: PaginationLabels = {
  showing: "Hiển thị",
  perPage: "Hiển thị:",
};

export const DEFAULT_DATA_TABLE_PAGINATION_LABELS: DataTablePaginationLabels = {
  selected: "Đã chọn",
  rows: "dòng",
  total: "Tổng",
  results: "kết quả",
  perPage: "Hiển thị",
  page: "Trang",
};
