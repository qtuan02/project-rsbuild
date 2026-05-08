import { contractStatusBadgeConfig } from "@/components/shared/badges/status-configs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/libs/cn";
import type { ContractStatus } from "@/types/contract";

type BadgeComponentProps = Parameters<typeof Badge>[0];

interface ContractStatusBadgeProps extends BadgeComponentProps {
  status: ContractStatus;
  isCompact?: boolean;
}

export const ContractStatusBadge = ({
  status,
  isCompact = false,
  className,
  ...props
}: ContractStatusBadgeProps) => {
  const config = contractStatusBadgeConfig[status];

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
