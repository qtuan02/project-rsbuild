import { Activity, Plus, Receipt } from "lucide-react";

import { SummaryCard } from "@/components/shared/cards";
import { ListPageHeader } from "@/components/shared/list";
import {
  DataTable,
  type DataTableSearchableColumn,
} from "@/components/shared/table";
import { formatCurrency } from "@/utils/currency";

import { expenseColumns } from "../components/expense-columns";
import { useExpenseList } from "../hooks/use-expense-list";

export const ExpenseListPage = () => {
  const { expenses, stats } = useExpenseList();

  const searchableColumns: DataTableSearchableColumn<
    (typeof expenses)[number]
  >[] = [
    { id: "category", title: "danh mục" },
    { id: "description", title: "mô tả" },
  ];

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
          label="Tổng chi"
          value={formatCurrency(stats.totalAmount)}
          icon={Receipt}
        />
        <SummaryCard
          label="Số phiếu chi"
          value={stats.totalCount}
          icon={Activity}
        />
        <SummaryCard
          label="Trung bình / khoản"
          value={formatCurrency(stats.averageAmount)}
          icon={Receipt}
          bgColor="bg-blue-100 dark:bg-blue-900/30"
          iconColor="text-blue-600 dark:text-blue-400"
        />
      </div>
      <DataTable
        data={expenses}
        columns={expenseColumns}
        searchableColumns={searchableColumns}
      />
    </div>
  );
};
