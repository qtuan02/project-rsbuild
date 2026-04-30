import { Calendar, Home, ReceiptText, User } from "lucide-react";

import { EntityActionMenu } from "@/components/shared/actions";
import { Badge } from "@/components/ui/badge";
import { routePathBuilders } from "@/config/routes";
import type { Invoice } from "@/types/invoice";
import { formatCurrency } from "@/utils/currency";

import { invoiceStatusConfig } from "../domain/invoice-display-config";

import type { ColumnDef } from "@tanstack/react-table";

export const invoiceColumns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "invoiceNumber",
    header: "Số hóa đơn",
    cell: ({ row }) => {
      const invoice = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ReceiptText className="h-4 w-4" />
          </div>
          <span className="font-mono font-medium">{invoice.invoiceNumber}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "tenant",
    header: "Khách thuê",
    cell: ({ row }) => {
      const invoice = row.original;
      return (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <User className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-medium">{invoice.tenant}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Home className="h-3 w-3" />
            <span>{invoice.room}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Tổng tiền",
    cell: ({ row }) => {
      return (
        <span className="font-bold text-primary">
          {formatCurrency(row.original.amount)}
        </span>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: "Hạn thanh toán",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">{row.original.dueDate}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.status;
      const config = invoiceStatusConfig[status];
      return (
        <Badge variant="outline" className={config.className}>
          {config.label}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const invoice = row.original;
      return (
        <EntityActionMenu
          items={[
            {
              key: "detail",
              label: "Xem chi tiết",
              link: routePathBuilders.invoiceDetail(invoice.id),
            },
            {
              key: "pdf",
              label: "Tải về PDF",
            },
          ]}
        />
      );
    },
  },
];
