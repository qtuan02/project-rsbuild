import { ArrowDown, ArrowUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/libs/cn";
import type { ReconciliationItem } from "@/types/reconciliation";
import { formatCurrency } from "@/utils/currency";

import type { ColumnDef } from "@tanstack/react-table";

export const reconciliationColumns: ColumnDef<ReconciliationItem>[] = [
  {
    accessorKey: "item",
    header: "Hạng mục",
    cell: ({ row }) => (
      <div className="font-semibold">{row.getValue("item")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant="secondary"
          className={cn(
            status === "gain"
              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
              : "bg-red-100 text-red-700 hover:bg-red-100",
          )}
        >
          {status === "gain" ? "Lãi" : "Lỗ"}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "income",
    header: "Thu từ khách thuê",
    cell: ({ row }) => (
      <div className="text-emerald-600 font-medium">
        {formatCurrency(row.getValue("income"))}
      </div>
    ),
  },
  {
    accessorKey: "expense",
    header: "Chi cho NCC",
    cell: ({ row }) => (
      <div className="text-red-600 font-medium">
        {formatCurrency(row.getValue("expense"))}
      </div>
    ),
  },
  {
    accessorKey: "diff",
    header: () => <div className="text-right">Chênh lệch</div>,
    cell: ({ row }) => {
      const diff = row.getValue("diff") as number;
      const status = row.original.status;
      const trend = row.original.trend;

      return (
        <div className="flex flex-col items-end">
          <div
            className={cn(
              "flex items-center gap-1 font-bold",
              status === "gain" ? "text-emerald-600" : "text-red-600",
            )}
          >
            {status === "gain" ? (
              <ArrowUp className="h-3 w-3" />
            ) : (
              <ArrowDown className="h-3 w-3" />
            )}
            {formatCurrency(Math.abs(diff))}
          </div>
          {trend && (
            <div
              className={cn(
                "text-[10px] font-medium opacity-70",
                trend > 0 ? "text-emerald-600" : "text-red-600",
              )}
            >
              {trend > 0 ? "+" : ""}
              {trend}% so với kỳ trước
            </div>
          )}
        </div>
      );
    },
  },
];
