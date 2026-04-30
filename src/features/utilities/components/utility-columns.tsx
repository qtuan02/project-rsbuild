import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Zap, Droplets, ArrowUpRight, History, Eye } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { routePathBuilders } from "@/config/routes";
import { cn } from "@/libs/cn";
import type { Utility } from "@/types/utility";

import {
  utilityStatusConfig,
  utilityTypeConfig,
} from "../domain/utility-display-config";

import type { ColumnDef } from "@tanstack/react-table";

export const utilityColumns: ColumnDef<Utility>[] = [
  {
    accessorKey: "roomName",
    header: "Phòng",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-bold text-foreground">
          {row.original.roomName}
        </span>
        <span className="text-[10px] text-muted-foreground uppercase">
          Phòng trọ
        </span>
      </div>
    ),
  },
  {
    accessorKey: "month",
    header: "Kỳ hóa đơn",
    cell: ({ row }) => {
      const [year, month] = row.original.month.split("-");
      return (
        <div className="flex items-center gap-2">
          <History className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="font-medium">
            {month}/{year}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Loại hình",
    cell: ({ row }) => {
      const type = row.original.type;
      const config = utilityTypeConfig[type];
      const Icon = type === "electricity" ? Zap : Droplets;

      return (
        <div
          className={cn(
            "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium",
            config.bgColor,
            config.color,
          )}
        >
          <Icon className="h-3.5 w-3.5" />
          {config.label}
        </div>
      );
    },
  },
  {
    accessorKey: "indices",
    header: "Chỉ số (Cũ / Mới)",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 font-mono text-sm tabular-nums">
        <span className="text-muted-foreground">{row.original.oldIndex}</span>
        <span className="text-muted-foreground/30">/</span>
        <span className="font-bold text-foreground">
          {row.original.newIndex}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "consumption",
    header: "Tiêu thụ",
    cell: ({ row }) => {
      const type = row.original.type;
      return (
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-primary tabular-nums">
            {row.original.consumption.toLocaleString()}
          </span>
          <span className="text-[10px] text-muted-foreground uppercase">
            {type === "electricity" ? "kWh" : "m³"}
          </span>
          <ArrowUpRight className="h-3 w-3 text-emerald-500" />
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.status;
      const config = utilityStatusConfig[status];
      return (
        <Badge
          variant="outline"
          className={cn("font-bold text-[10px] uppercase", config.className)}
        >
          {config.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Ngày chốt",
    cell: ({ row }) => (
      <div className="text-xs text-muted-foreground">
        {format(new Date(row.original.updatedAt), "dd/MM/yyyy HH:mm", {
          locale: vi,
        })}
      </div>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <Button variant="outline" size="icon-sm" asChild>
        <Link to={routePathBuilders.utilityDetail(row.original.id)}>
          <Eye className="h-4 w-4" />
        </Link>
      </Button>
    ),
  },
];
