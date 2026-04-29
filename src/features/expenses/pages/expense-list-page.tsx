import { Activity, FileText, Plus, Receipt } from "lucide-react";

import { SummaryCard } from "@/components/shared/cards";
import { ListPageHeader } from "@/components/shared/list";
import { DEFAULT_PAGINATION_OPTIONS } from "@/components/shared/pagination/pagination-contracts";
import {
  DataTablePagination,
  DataTableToolbar,
  DataTableView,
  useDataTable,
} from "@/components/shared/table";
import { formatCurrency } from "@/utils/currency";

import { expenseColumns } from "../components/expense-columns";
import { useExpenseList } from "../hooks/use-expense-list";

export const ExpenseListPage = () => {
  const { expenses, stats, searchableColumns, filterableColumns } =
    useExpenseList();

  const { table } = useDataTable({
    data: expenses,
    columns: expenseColumns,
    getRowId: (row) => row.id,
    initialPageSize: DEFAULT_PAGINATION_OPTIONS,
  });

  const hasRows = table.getRowModel().rows.length > 0;

  return (
    <div className="space-y-6">
      <ListPageHeader
        title="Chi phí vận hành"
        description="Theo dõi các khoản chi nội bộ, bảo trì và vận hành theo từng tòa nhà."
        actions={[
          {
            key: "create-expense",
            label: "Thêm chi phí",
            icon: <Plus className="mr-2 h-4 w-4" />,
          },
        ]}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          label="Tổng chi phí"
          value={formatCurrency(stats.totalAmount)}
          icon={Receipt}
        />
        <SummaryCard
          label="Số phiếu chi"
          value={stats.totalCount}
          icon={Activity}
          bgColor="bg-blue-100 dark:bg-blue-900/30"
          iconColor="text-blue-600 dark:text-blue-400"
        />
        <SummaryCard
          label="Trung bình/khoản"
          value={formatCurrency(stats.averageAmount)}
          icon={Receipt}
          bgColor="bg-amber-100 dark:bg-amber-900/30"
          iconColor="text-amber-600 dark:text-amber-400"
        />
      </div>

      <div className="space-y-4">
        <DataTableToolbar
          table={table}
          searchableColumns={searchableColumns}
          filterableColumns={filterableColumns}
          showViewOptions={false}
        />
        <DataTableView
          table={table}
          columns={expenseColumns}
          emptyIcon={FileText}
          emptyTitle="Không tìm thấy phiếu chi"
          emptyDescription="Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để xem kết quả."
          resetFilters={() => table.resetColumnFilters()}
        />
        {hasRows && <DataTablePagination table={table} />}
      </div>
    </div>
  );
};
