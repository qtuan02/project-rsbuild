import { Badge, type BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import type { InvoiceStatus } from "@/types/invoice";
import { invoiceStatusConfig } from "@/features/invoices/domain/invoice-display-config";

interface InvoiceStatusBadgeProps extends BadgeProps {
  status: InvoiceStatus;
  compact?: boolean;
}

export const InvoiceStatusBadge = ({
  status,
  compact = false,
  className,
  ...props
}: InvoiceStatusBadgeProps) => {
  const config = invoiceStatusConfig[status];

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
