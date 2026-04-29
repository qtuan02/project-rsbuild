import { Banknote, TrendingUp, TrendingDown, Receipt } from "lucide-react";

import { SummaryCard } from "@/components/shared/cards";
import { ListPageHeader } from "@/components/shared/list";
import { DEFAULT_PAGINATION_OPTIONS } from "@/components/shared/pagination/pagination-contracts";
import {
  DataTableView,
  DataTablePagination,
  DataTableToolbar,
  useDataTable,
} from "@/components/shared/table";
import { formatCurrency } from "@/utils/currency";

import { reconciliationColumns } from "../components/reconciliation-columns";
import { useReconciliation } from "../hooks/use-reconciliation";

export const ReconciliationPage = () => {
  const { data, stats, searchableColumns, filterableColumns } =
    useReconciliation();

  const { table } = useDataTable({
    data,
    columns: reconciliationColumns,
    getRowId: (row) => row.id,
    initialPageSize: DEFAULT_PAGINATION_OPTIONS,
  });

  const hasRows = table.getRowModel().rows.length > 0;

  return (
    <div className="space-y-6">
      <ListPageHeader
        title="Đối soát chi phí"
        description="So sánh giữa số tiền thu từ khách và chi trả cho nhà cung cấp theo hạng mục dịch vụ."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          label="Tổng thu dịch vụ"
          value={formatCurrency(stats.totalIncome)}
          icon={Receipt}
          bgColor="bg-emerald-100 dark:bg-emerald-900/30"
          iconColor="text-emerald-600 dark:text-emerald-400"
        />
        <SummaryCard
          label="Tổng chi dịch vụ"
          value={formatCurrency(stats.totalExpense)}
          icon={Receipt}
          bgColor="bg-red-100 dark:bg-red-900/30"
          iconColor="text-red-600 dark:text-red-400"
        />
        <SummaryCard
          label="Chênh lệch (Lợi nhuận)"
          value={formatCurrency(stats.netProfit)}
          icon={stats.netProfit >= 0 ? TrendingUp : TrendingDown}
          bgColor={
            stats.netProfit >= 0
              ? "bg-blue-100 dark:bg-blue-900/30"
              : "bg-orange-100 dark:bg-orange-900/30"
          }
          iconColor={
            stats.netProfit >= 0
              ? "text-blue-600 dark:text-blue-400"
              : "text-orange-600 dark:text-orange-400"
          }
        />
        <SummaryCard
          label="Tỷ suất lợi nhuận"
          value={`${stats.profitMargin}%`}
          icon={Banknote}
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
          columns={reconciliationColumns}
          emptyIcon={Receipt}
          emptyTitle="Không có dữ liệu đối soát"
          emptyDescription="Dữ liệu sẽ hiển thị khi có hóa đơn khách thuê và hóa đơn nhà cung cấp trong cùng kỳ."
          resetFilters={() => table.resetColumnFilters()}
        />
        {hasRows && <DataTablePagination table={table} />}
      </div>
    </div>
  );
};
