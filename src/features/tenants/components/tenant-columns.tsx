import {
  Calendar,
  CreditCard,
  Home,
  Phone,
  User,
  UserCircle,
} from "lucide-react";

import { EntityActionMenu } from "@/components/shared/actions";
import { Badge } from "@/components/ui/badge";
import { routePathBuilders } from "@/config/routes";
import type { Tenant } from "@/types/tenant";

import { tenantStatusConfig } from "../domain/tenant-status-config";

import type { ColumnDef } from "@tanstack/react-table";

export const tenantColumns: ColumnDef<Tenant>[] = [
  {
    accessorKey: "name",
    header: "Khách thuê",
    cell: ({ row }) => {
      const tenant = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <User className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{tenant.name}</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Phone className="h-3 w-3" /> {tenant.phone}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "room",
    header: "Phòng",
    cell: ({ row }) => {
      const tenant = row.original;
      return (
        <div className="flex items-center gap-2">
          <Home className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{tenant.room}</span>
            <span className="text-[10px] text-muted-foreground">
              Tầng {tenant.floor}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "moveInDate",
    header: "Ngày vào",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">{row.original.moveInDate}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.status;
      const config = tenantStatusConfig[status];
      return (
        <Badge variant="outline" className={config.className}>
          {config.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => {
      const tenant = row.original;
      return (
        <EntityActionMenu
          items={[
            {
              key: "detail",
              label: "Xem chi tiết",
              icon: <UserCircle className="mr-2 h-3.5 w-3.5" />,
              link: routePathBuilders.tenantDetail(tenant.id),
            },
            {
              key: "invoice",
              label: "Tạo hóa đơn",
              icon: <CreditCard className="mr-2 h-3.5 w-3.5" />,
            },
          ]}
        />
      );
    },
  },
];
