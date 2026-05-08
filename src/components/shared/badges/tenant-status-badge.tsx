import { tenantStatusBadgeConfig } from "@/components/shared/badges/status-configs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/libs/cn";
import type { TenantStatus } from "@/types/tenant";

type BadgeComponentProps = Parameters<typeof Badge>[0];

interface TenantStatusBadgeProps extends BadgeComponentProps {
  status: TenantStatus;
  isCompact?: boolean;
}

export const TenantStatusBadge = ({
  status,
  isCompact = false,
  className,
  ...props
}: TenantStatusBadgeProps) => {
  const config = tenantStatusBadgeConfig[status];

  return (
    <Badge
      variant="outline"
      className={cn(config.className, isCompact && "text-xs", className)}
      {...props}
    >
      {config.label}
    </Badge>
  );
};
