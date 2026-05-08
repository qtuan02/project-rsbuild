import { invoiceStatusBadgeConfig } from "@/components/shared/badges/status-configs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/libs/cn";
import type { InvoiceStatus } from "@/types/invoice";

type BadgeComponentProps = Parameters<typeof Badge>[0];

interface InvoiceStatusBadgeProps extends BadgeComponentProps {
  status: InvoiceStatus;
  isCompact?: boolean;
}

export const InvoiceStatusBadge = ({
  status,
  isCompact = false,
  className,
  ...props
}: InvoiceStatusBadgeProps) => {
  const config = invoiceStatusBadgeConfig[status];

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
