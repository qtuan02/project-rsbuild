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

export const defaultPaginationPageSize = 12;
export const defaultPaginationPageSizeOptions = [12, 24, 36, 48, 60];

export const defaultPaginationLabels: PaginationLabels = {
  showing: "Hiển thị",
  perPage: "Hiển thị:",
};

export const defaultDataTablePaginationLabels: DataTablePaginationLabels = {
  selected: "Đã chọn",
  rows: "dòng",
  total: "Tổng",
  results: "kết quả",
  perPage: "Hiển thị",
  page: "Trang",
};
