import { roomStatusBadgeConfig } from "@/components/shared/badges/status-configs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import type { RoomStatus } from "@/types/room";

type BadgeComponentProps = Parameters<typeof Badge>[0];

interface RoomStatusBadgeProps extends BadgeComponentProps {
  status: RoomStatus;
  compact?: boolean;
}

export const RoomStatusBadge = ({
  status,
  compact = false,
  className,
  ...props
}: RoomStatusBadgeProps) => {
  const config = roomStatusBadgeConfig[status];
  const Icon = config.icon;

  return (
    <Badge
      variant={config.variant}
      className={cn(config.className, compact && "gap-1", className)}
      {...props}
    >
      {!compact && <Icon className="h-3 w-3" />}
      {config.label}
    </Badge>
  );
};
