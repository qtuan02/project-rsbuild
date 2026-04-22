import { Badge, type BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import type { TenantStatus } from "@/types/tenant";
import { tenantStatusConfig } from "@/features/tenants/domain/tenant-status-config";

interface TenantStatusBadgeProps extends BadgeProps {
  status: TenantStatus;
  compact?: boolean;
}

export const TenantStatusBadge = ({
  status,
  compact = false,
  className,
  ...props
}: TenantStatusBadgeProps) => {
  const config = tenantStatusConfig[status];

  return (
    <Badge
      variant="outline"
      className={cn(config.className, compact && "text-xs", className)}
      {...props}
    >
      {config.label}
    </Badge>
  );
};
