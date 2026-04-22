import { GripVertical } from "lucide-react";

import { DataTableColumnHeader } from "@/components/shared/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/cn";
import type { Contract } from "@/types/contract";
import { formatCurrency } from "@/utils/currency";

import { ContractRowActions } from "./contract-row-actions";
import { contractStatusConfig } from "../domain/contract-display-config";

import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Contract>[] = [
  {
    id: "drag-handle",
    header: "",
    cell: () => (
      <GripVertical className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing" />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Chọn tất cả"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Chọn dòng"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "contractNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số HĐ" />
    ),
    cell: ({ row }) => (
      <span className="font-mono font-medium">{row.getValue("contractNumber")}</span>
    ),
  },
  {
    accessorKey: "tenant",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Khách thuê" />
    ),
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("tenant")}</span>
    ),
  },
  {
    accessorKey: "room",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phòng" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="text-sm">{row.getValue("room")}</span>
        <Badge variant="outline" className="font-mono">
          T{(row.original as Contract).floor}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "rentAmount",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Tiền thuê"
        className="justify-end"
      />
    ),
    cell: ({ row }) => {
      const amount = row.getValue("rentAmount") as number;
      return (
        <div className="text-right font-medium tabular-nums">
          {formatCurrency(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bắt đầu" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.getValue("startDate")}
      </span>
    ),
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kết thúc" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.getValue("endDate")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as Contract["status"];
      const config = contractStatusConfig[status];
      const Icon = config.icon;

      return (
        <Badge variant={config.variant} className={cn(config.className)}>
          <Icon className="mr-1 h-3 w-3" />
          {config.label}
        </Badge>
      );
    },
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "lastUpdated",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cập nhật" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.getValue("lastUpdated")}
      </span>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ContractRowActions contract={row.original} />,
  },
];
