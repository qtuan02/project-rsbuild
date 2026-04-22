import { GripVertical } from "lucide-react";

import { DataTableColumnHeader } from "@/components/shared/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/cn";
import type { Room } from "@/types/room";
import { formatCurrency } from "@/utils/currency";

import { RoomRowActions } from "./room-row-actions";
import {
  roomStatusConfig,
  roomTypeConfig,
} from "../domain/room-display-config";

import type { ColumnDef } from "@tanstack/react-table";

// ─── Columns ─────────────────────────────────────────────────────────
export const columns: ColumnDef<Room>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên phòng" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="font-medium">{row.getValue("name")}</span>
      </div>
    ),
  },
  {
    accessorKey: "floor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tầng" />
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <Badge variant="outline" className="font-mono">
          T{row.getValue("floor")}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Loại phòng" />
    ),
    cell: ({ row }) => {
      const type = row.getValue("type") as Room["type"];
      return <span className="text-sm">{roomTypeConfig[type].label}</span>;
    },
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "area",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Diện tích"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right font-mono text-sm tabular-nums">
        {row.getValue("area")}m²
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Giá thuê"
        className="justify-end"
      />
    ),
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      return (
        <div className="text-right font-medium tabular-nums">
          {formatCurrency(price)}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as Room["status"];
      const config = roomStatusConfig[status];
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
    accessorKey: "tenant",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Khách thuê" />
    ),
    cell: ({ row }) => {
      const tenant = row.getValue("tenant") as string | null;
      return tenant ? (
        <span className="text-sm">{tenant}</span>
      ) : (
        <span className="text-sm text-muted-foreground italic">—</span>
      );
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
    cell: ({ row }) => <RoomRowActions room={row.original} />,
  },
];
