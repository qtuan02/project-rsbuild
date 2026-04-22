import { Badge } from "@/components/ui/badge";
import { contractStatusConfig } from "@/features/contracts/domain/contract-display-config";
import { cn } from "@/lib/cn";
import type { ContractStatus } from "@/types/contract";

type BadgeComponentProps = Parameters<typeof Badge>[0];

interface ContractStatusBadgeProps extends BadgeComponentProps {
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
