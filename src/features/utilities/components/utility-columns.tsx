import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { routePathBuilders } from "@/config/routes";
import type { Utility } from "@/types/utility";

import { utilityStatusUiConfig } from "./utility-ui-config";
import { utilityStatusConfig } from "../domain/utility-display-config";

import type { ColumnDef } from "@tanstack/react-table";

export const utilityColumns: ColumnDef<Utility>[] = [
  {
    accessorKey: "roomName",
    header: "Phòng",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.roomName}</span>
    ),
  },
  {
    accessorKey: "month",
    header: "Tháng",
    cell: ({ row }) => {
      const [year, month] = row.original.month.split("-");
      return `${month}/${year}`;
    },
  },
  {
    accessorKey: "type",
    header: "Loại",
    cell: ({ row }) => {
      const type = row.original.type;
      return type === "electricity" ? "Điện" : "Nước";
    },
  },
  {
    accessorKey: "oldIndex",
    header: "Chỉ số cũ",
    cell: ({ row }) => row.original.oldIndex.toLocaleString(),
  },
  {
    accessorKey: "newIndex",
    header: "Chỉ số mới",
    cell: ({ row }) => row.original.newIndex.toLocaleString(),
  },
  {
    accessorKey: "consumption",
    header: "Tiêu thụ",
    cell: ({ row }) => row.original.consumption.toLocaleString(),
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.status;
      const config = utilityStatusConfig[status];
      const statusUi = utilityStatusUiConfig[status];
      const Icon = statusUi.Icon;
      return (
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusUi.badgeClassName}`}
          >
            {config.label}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Cập nhật lần cuối",
    cell: ({ row }) =>
      format(new Date(row.original.updatedAt), "dd MMM yyyy, HH:mm", {
        locale: vi,
      }),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <Button variant="ghost" size="sm" asChild>
        <Link to={routePathBuilders.utilityDetail(row.original.id)}>
          Xem chi tiết
        </Link>
      </Button>
    ),
  },
];
