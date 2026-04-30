import { Copy, Edit, Eye, Trash2 } from "lucide-react";

import { EntityActionMenu } from "@/components/shared/actions";
import { routePathBuilders } from "@/config/routes";
import type { Room } from "@/types/room";

interface RoomRowActionsProps {
  room: Room;
  side?: "top" | "bottom" | "left" | "right";
}

export const RoomRowActions = ({
  room,
  side = "bottom",
}: RoomRowActionsProps) => {
  return (
    <EntityActionMenu
      sideContent={side}
      items={[
        {
          key: "copy",
          label: "Sao chép ID",
          icon: <Copy className="mr-2 h-3.5 w-3.5" />,
          onClick: () => navigator.clipboard.writeText(room.id),
        },
        {
          key: "detail",
          label: "Xem chi tiết",
          icon: <Eye className="mr-2 h-3.5 w-3.5" />,
          link: routePathBuilders.roomDetail(room.id),
        },
        {
          key: "edit",
          label: "Chỉnh sửa",
          icon: <Edit className="mr-2 h-3.5 w-3.5" />,
        },
        {
          key: "delete",
          label: "Xóa phòng",
          icon: <Trash2 className="mr-2 h-3.5 w-3.5" />,
          destructive: true,
        },
      ]}
    />
  );
};
