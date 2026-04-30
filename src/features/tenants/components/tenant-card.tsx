import {
  Calendar,
  CreditCard,
  DoorOpen,
  Mail,
  Phone,
  UserCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { EntityActionMenu } from "@/components/shared/actions";
import { EntityListCard } from "@/components/shared/cards";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { routePathBuilders } from "@/config/routes";
import { cn } from "@/libs/cn";
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
    <EntityListCard
      header={
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
          </div>
        </CardHeader>
      }
      content={
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
      }
      footer={
        <CardFooter className="flex-wrap gap-2 text-xs sm:gap-4 justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>Vào: {tenant.moveInDate}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>HĐ: {tenant.contractEnd}</span>
            </div>
          </div>

          <EntityActionMenu
            sideContent="top"
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
        </CardFooter>
      }
    />
  );
};
