import {
  Activity,
  AlertCircle,
  Clock,
  Droplets,
  Zap,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { EntityListCard } from "@/components/shared/cards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { routePathBuilders } from "@/config/routes";
import { cn } from "@/libs/cn";
import type { Utility } from "@/types/utility";

import {
  utilityStatusConfig,
  utilityTypeConfig,
} from "../domain/utility-display-config";

interface UtilityCardProps {
  utility: Utility;
}

export const UtilityCard = ({ utility }: UtilityCardProps) => {
  const navigate = useNavigate();
  const statusConfig = utilityStatusConfig[utility.status];
  const typeConfig = utilityTypeConfig[utility.type];
  const Icon = utility.type === "electricity" ? Zap : Droplets;

  return (
    <EntityListCard
      accentClassName={typeConfig.accentColor}
      header={
        <CardHeader className="p-4 pb-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "rounded-xl p-2.5 shadow-sm transition-transform group-hover:scale-110",
                  typeConfig.bgColor,
                  typeConfig.color,
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold leading-tight text-foreground">
                  {utility.roomName}
                </h3>
                <p className="text-xs text-muted-foreground">{utility.month}</p>
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
          <div className="grid grid-cols-2 gap-3 rounded-xl bg-muted/40 p-3 ring-1 ring-border/50">
            <div className="space-y-1">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/80">
                Chỉ số cũ
              </p>
              <p className="text-base font-bold tabular-nums text-foreground/80">
                {utility.oldIndex}
              </p>
            </div>
            <div className="space-y-1 border-l pl-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/80">
                Chỉ số mới
              </p>
              <p className="text-base font-bold tabular-nums text-foreground">
                {utility.newIndex}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-dashed pt-3">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "rounded-full p-1",
                  typeConfig.bgColor,
                  typeConfig.color,
                )}
              >
                <Activity className="h-3 w-3" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-medium text-muted-foreground uppercase leading-none mb-1">
                  Tiêu thụ
                </span>
                <span className="text-sm font-bold text-foreground">
                  {utility.consumption}{" "}
                  {utility.type === "electricity" ? "kWh" : "m³"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {utility.status === "anomaly" && (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-red-600 animate-pulse">
                  <AlertCircle className="h-4 w-4" />
                </div>
              )}
              {utility.status === "verified" && (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Clock className="h-4 w-4" />
                </div>
              )}
              <ChevronRight className="h-4 w-4 text-muted-foreground/30 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>
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
              navigate(routePathBuilders.utilityDetail(utility.id))
            }
          >
            Xem chi tiết
            <ChevronRight className="ml-1 h-3 w-3" />
          </Button>
        </CardFooter>
      }
    />
  );
};
