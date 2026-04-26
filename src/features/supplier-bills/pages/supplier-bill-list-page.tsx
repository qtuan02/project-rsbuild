import { Activity, Plus, Receipt } from "lucide-react";

import { SummaryCard } from "@/components/shared/cards";
import { ListPageHeader } from "@/components/shared/list";
import {
  DataTable,
  type DataTableFilterableColumn,
  type DataTableSearchableColumn,
} from "@/components/shared/table";
import type { SupplierBill } from "@/types/supplier-bill";
import { formatCurrency } from "@/utils/currency";

import { supplierBillColumns } from "../components/supplier-bill-columns";
import { useSupplierBillList } from "../hooks/use-supplier-bill-list";

export const SupplierBillListPage = () => {
  const { bills, totals } = useSupplierBillList();
  const searchableColumns: DataTableSearchableColumn<SupplierBill>[] = [
    { id: "supplierName", title: "nhà cung cấp" },
    { id: "billingPeriod", title: "kỳ hóa đơn" },
  ];
  const filterableColumns: DataTableFilterableColumn<SupplierBill>[] = [
    {
      id: "type",
      title: "Loại dịch vụ",
      options: [
        { label: "Điện", value: "electricity" },
        { label: "Nước", value: "water" },
        { label: "Rác", value: "trash" },
        { label: "Internet", value: "internet" },
        { label: "Khác", value: "other" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <ListPageHeader
        title="Hóa đơn nhà cung cấp"
        description="Theo dõi và quản lý các khoản chi trả cho dịch vụ đầu vào"
        actions={[
          {
            key: "add-bill",
            label: "Thêm hóa đơn",
            icon: <Plus className="mr-2 h-4 w-4" />,
          },
        ]}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          label="Tổng chi tháng này"
          value={formatCurrency(totals.totalAmount)}
          icon={Receipt}
        />
        <SummaryCard
          label="Chờ thanh toán"
          value={formatCurrency(totals.pendingAmount)}
          icon={Activity}
          bgColor="bg-amber-100 dark:bg-amber-900/30"
          iconColor="text-amber-600 dark:text-amber-400"
        />
        <SummaryCard label="Số hóa đơn" value={totals.count} icon={Receipt} />
      </div>

      <DataTable
        data={bills}
        columns={supplierBillColumns}
        searchableColumns={searchableColumns}
        filterableColumns={filterableColumns}
      />
    </div>
  );
};
