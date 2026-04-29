import {
  Calendar,
  FileText,
  User,
  Home,
  Landmark,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { EntityListCard } from "@/components/shared/cards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { routePathBuilders } from "@/config/routes";
import { cn } from "@/lib/cn";
import type { Contract } from "@/types/contract";
import { formatCurrency } from "@/utils/currency";

import { contractStatusConfig } from "../domain/contract-display-config";

interface ContractCardProps {
  contract: Contract;
}

export const ContractCard = ({ contract }: ContractCardProps) => {
  const navigate = useNavigate();
  const statusConfig = contractStatusConfig[contract.status];

  return (
    <EntityListCard
      header={
        <CardHeader className="p-4 pb-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm transition-transform group-hover:scale-110">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold leading-tight text-foreground">
                  {contract.contractNumber}
                </h3>
                <div className="mt-1 flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase font-medium">
                  <Calendar className="h-2.5 w-2.5" />
                  <span>Ký: {contract.startDate}</span>
                </div>
              </div>
            </div>
            <Badge
              variant="outline"
              className={cn(
                "text-[10px] font-bold uppercase tracking-wider",
                statusConfig.className,
              )}
            >
              {statusConfig.label}
            </Badge>
          </div>
        </CardHeader>
      }
      content={
        <CardContent className="p-4 pt-4">
          <div className="space-y-3 rounded-xl bg-muted/30 p-3 ring-1 ring-border/50">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-3.5 w-3.5" />
                <span className="text-xs">Khách thuê</span>
              </div>
              <span className="font-semibold text-foreground">
                {contract.tenant}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Home className="h-3.5 w-3.5" />
                <span className="text-xs">Phòng</span>
              </div>
              <span className="font-semibold text-foreground">
                {contract.room}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span className="text-xs">Thời hạn</span>
              </div>
              <span className="text-[11px] font-medium text-muted-foreground">
                {contract.startDate} - {contract.endDate}
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 border-t border-dashed pt-3">
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                <Landmark className="h-2.5 w-2.5 text-primary/70" />
                <span>Tiền thuê</span>
              </div>
              <p className="text-sm font-bold text-primary">
                {formatCurrency(contract.rentAmount)}
              </p>
            </div>

            {contract.depositAmount && (
              <div className="space-y-1 border-l pl-4">
                <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <Landmark className="h-2.5 w-2.5 text-emerald-600/70" />
                  <span>Tiền cọc</span>
                </div>
                <p className="text-sm font-bold text-foreground/80">
                  {formatCurrency(contract.depositAmount)}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      }
      footer={
        <CardFooter className="px-4 py-2 flex justify-end">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-muted-foreground/70 hover:text-primary cursor-pointer"
            onClick={() =>
              navigate(routePathBuilders.contractDetail(contract.id))
            }
          >
            Chi tiết hợp đồng
            <ChevronRight className="ml-1 h-3 w-3" />
          </Button>
        </CardFooter>
      }
    />
  );
};
