import { Copy, Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routePathBuilders } from "@/config/routes";
import type { Room } from "@/types/room";

interface RoomRowActionsProps {
  room: Room;
}

export const RoomRowActions = ({ room }: RoomRowActionsProps) => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <span className="sr-only">Mở menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(room.id)}
          >
            <Copy className="mr-2 h-3.5 w-3.5" />
            Sao chép ID
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => navigate(routePathBuilders.roomDetail(room.id))}
          >
            <Eye className="mr-2 h-3.5 w-3.5" />
            Xem chi tiết
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit className="mr-2 h-3.5 w-3.5" />
            Chỉnh sửa
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Trash2 className="mr-2 h-3.5 w-3.5" />
          Xóa phòng
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
