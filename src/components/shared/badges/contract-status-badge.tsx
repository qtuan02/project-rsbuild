import { Badge, type BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import type { ContractStatus } from "@/types/contract";
import { contractStatusConfig } from "@/features/contracts/domain/contract-display-config";

interface ContractStatusBadgeProps extends BadgeProps {
  status: ContractStatus;
  compact?: boolean;
}

export const ContractStatusBadge = ({
  status,
  compact = false,
  className,
  ...props
}: ContractStatusBadgeProps) => {
  const config = contractStatusConfig[status];

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
