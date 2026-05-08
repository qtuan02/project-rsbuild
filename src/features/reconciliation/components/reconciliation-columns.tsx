import { ArrowDown, ArrowUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/libs/cn";
import type { ReconciliationItem } from "@/types/reconciliation";
import { formatCurrency } from "@/utils/currency";

import type { ColumnDef } from "@tanstack/react-table";

export const reconciliationColumns: ColumnDef<ReconciliationItem>[] = [
  {
    accessorKey: "lineItemName",
    header: "Hạng mục",
    cell: ({ row }) => (
      <div className="font-semibold">{row.getValue("lineItemName")}</div>
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
    accessorKey: "incomeAmount",
    header: "Thu từ khách thuê",
    cell: ({ row }) => (
      <div className="text-emerald-600 font-medium">
        {formatCurrency(row.getValue("incomeAmount"))}
      </div>
    ),
  },
  {
    accessorKey: "expenseAmount",
    header: "Chi cho NCC",
    cell: ({ row }) => (
      <div className="text-red-600 font-medium">
        {formatCurrency(row.getValue("expenseAmount"))}
      </div>
    ),
  },
  {
    accessorKey: "netAmount",
    header: () => <div className="text-right">Chênh lệch</div>,
    cell: ({ row }) => {
      const netAmount = row.getValue("netAmount") as number;
      const status = row.original.status;
      const trendRate = row.original.trendRate;

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
            {formatCurrency(Math.abs(netAmount))}
          </div>
          {trendRate && (
            <div
              className={cn(
                "text-[10px] font-medium opacity-70",
                trendRate > 0 ? "text-emerald-600" : "text-red-600",
              )}
            >
              {trendRate > 0 ? "+" : ""}
              {trendRate}% so với kỳ trước
            </div>
          )}
        </div>
      );
    },
  },
];
