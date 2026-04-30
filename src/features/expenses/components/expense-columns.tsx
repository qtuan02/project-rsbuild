import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { routePathBuilders } from "@/config/routes";
import type { Expense } from "@/types/expense";
import { formatCurrency } from "@/utils/currency";

import type { ColumnDef } from "@tanstack/react-table";

export const expenseColumns: ColumnDef<Expense>[] = [
  {
    accessorKey: "category",
    header: "Danh mục",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("category") as string}</div>
    ),
  },
  {
    accessorKey: "expenseDate",
    header: "Ngày chi",
  },
  {
    accessorKey: "amount",
    header: "Số tiền",
    cell: ({ row }) => (
      <div className="font-semibold tabular-nums">
        {formatCurrency(row.original.amount)}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Mô tả",
    cell: ({ row }) => row.original.description || "---",
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <Button variant="outline" size="icon-sm" asChild>
        <Link to={routePathBuilders.expenseDetail(row.original.id)}>
          <Eye className="h-4 w-4" />
        </Link>
      </Button>
    ),
  },
];
