import { Badge, type BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import type { Room, RoomStatus } from "@/types/room";
import { roomStatusConfig } from "@/features/rooms/domain/room-display-config";

interface RoomStatusBadgeProps extends BadgeProps {
  status: RoomStatus;
  compact?: boolean;
}

export const RoomStatusBadge = ({
  status,
  compact = false,
  className,
  ...props
}: RoomStatusBadgeProps) => {
  const config = roomStatusConfig[status];
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
