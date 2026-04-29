import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { routePathBuilders } from "@/config/routes";
import type { SupplierBill } from "@/types/supplier-bill";
import { formatCurrency } from "@/utils/currency";

import type { ColumnDef } from "@tanstack/react-table";

export const supplierBillColumns: ColumnDef<SupplierBill>[] = [
  {
    accessorKey: "type",
    header: "Loại dịch vụ",
    cell: ({ row }) => <span className="capitalize">{row.original.type}</span>,
  },
  {
    accessorKey: "supplierName",
    header: "Nhà cung cấp",
  },
  {
    accessorKey: "billingPeriod",
    header: "Kỳ hóa đơn",
  },
  {
    accessorKey: "totalAmount",
    header: "Số tiền",
    cell: ({ row }) => (
      <div className="font-semibold">
        {formatCurrency(row.original.totalAmount)}
      </div>
    ),
  },
  {
    accessorKey: "paymentDate",
    header: "Ngày thanh toán",
    cell: ({ row }) => row.original.paymentDate || "---",
  },
  {
    id: "status",
    header: () => <div className="text-right">Trạng thái</div>,
    cell: ({ row }) => (
      <div className="text-right">
        <Badge variant={row.original.paymentDate ? "default" : "secondary"}>
          {row.original.paymentDate ? "Đã trả" : "Chờ trả"}
        </Badge>
      </div>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <Button variant="ghost" size="icon-sm" asChild>
        <Link to={routePathBuilders.supplierBillDetail(row.original.id)}>
          <Eye className="h-4 w-4" />
        </Link>
      </Button>
    ),
  },
];
