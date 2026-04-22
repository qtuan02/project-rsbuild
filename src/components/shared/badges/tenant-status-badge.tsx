import { Badge } from "@/components/ui/badge";
import { tenantStatusConfig } from "@/features/tenants/domain/tenant-status-config";
import { cn } from "@/lib/cn";
import type { TenantStatus } from "@/types/tenant";

type BadgeComponentProps = Parameters<typeof Badge>[0];

interface TenantStatusBadgeProps extends BadgeComponentProps {
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
