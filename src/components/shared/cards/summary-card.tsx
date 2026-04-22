import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import type { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  bgColor?: string;
  iconColor?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const SummaryCard = ({
  label,
  value,
  icon: Icon,
  bgColor = "bg-primary/10",
  iconColor = "text-primary",
  trend,
  className,
}: SummaryCardProps) => {
  return (
    <Card size="sm" className={className}>
      <CardContent className="flex items-center gap-3">
        {Icon && (
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
              bgColor,
            )}
          >
            <Icon className={cn("h-4 w-4", iconColor)} />
          </div>
        )}
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">{label}</p>
          <div className="flex items-end gap-2">
            <p className="text-xl font-bold tabular-nums">{value}</p>
            {trend && (
              <span
                className={cn(
                  "text-xs font-semibold",
                  trend.isPositive
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-600 dark:text-red-400",
                )}
              >
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
