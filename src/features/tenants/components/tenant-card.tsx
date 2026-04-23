import {
  Calendar,
  CreditCard,
  DoorOpen,
  Mail,
  MoreHorizontal,
  Phone,
  UserCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routePathBuilders } from "@/config/routes";
import { cn } from "@/lib/cn";
import type { Tenant } from "@/types/tenant";
import { formatCurrency } from "@/utils/currency";
import { getInitials } from "@/utils/string";

import { tenantStatusConfig } from "../domain/tenant-status-config";

interface TenantCardProps {
  tenant: Tenant;
}

export const TenantCard = ({ tenant }: TenantCardProps) => {
  const navigate = useNavigate();
  const statusCfg = tenantStatusConfig[tenant.status];

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary/60 via-primary to-primary/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <CardHeader className="pb-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm",
                tenant.avatarColor,
              )}
            >
              {getInitials(tenant.name)}
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold leading-tight text-foreground">
                {tenant.name}
              </h3>
              <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                <DoorOpen className="h-3 w-3 shrink-0" />
                <span>{tenant.room}</span>
                <span className="text-border">•</span>
                <span>Tầng {tenant.floor}</span>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 data-[state=open]:opacity-100"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() =>
                    navigate(routePathBuilders.tenantDetail(tenant.id))
                  }
                >
                  <UserCircle className="mr-2 h-3.5 w-3.5" />
                  Xem chi tiết
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-3.5 w-3.5" />
                  Tạo hóa đơn
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-3">
        <Badge variant="outline" className={statusCfg.className}>
          {statusCfg.label}
        </Badge>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone className="h-3 w-3 shrink-0 text-muted-foreground/70" />
            <span className="truncate">{tenant.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="h-3 w-3 shrink-0 text-muted-foreground/70" />
            <span className="truncate">{tenant.email}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 rounded-lg bg-muted/50 p-2.5 sm:grid-cols-2">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
              Tiền thuê
            </p>
            <p className="mt-0.5 text-sm font-semibold tabular-nums text-foreground">
              {formatCurrency(tenant.rentAmount)}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
              Tiền cọc
            </p>
            <p className="mt-0.5 text-sm font-semibold tabular-nums text-foreground">
              {formatCurrency(tenant.depositAmount)}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex-wrap gap-2 text-xs sm:gap-4">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>Vào: {tenant.moveInDate}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>HĐ: {tenant.contractEnd}</span>
        </div>
      </CardFooter>
    </Card>
  );
};
