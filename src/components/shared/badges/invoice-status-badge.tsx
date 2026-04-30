import { invoiceStatusBadgeConfig } from "@/components/shared/badges/status-configs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/libs/cn";
import type { InvoiceStatus } from "@/types/invoice";

type BadgeComponentProps = Parameters<typeof Badge>[0];

interface InvoiceStatusBadgeProps extends BadgeComponentProps {
  status: InvoiceStatus;
  compact?: boolean;
}

export const InvoiceStatusBadge = ({
  status,
  compact = false,
  className,
  ...props
}: InvoiceStatusBadgeProps) => {
  const config = invoiceStatusBadgeConfig[status];

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
