import { Badge } from "@/components/ui/badge";
import { invoiceStatusConfig } from "@/features/invoices/domain/invoice-display-config";
import { cn } from "@/lib/cn";
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
