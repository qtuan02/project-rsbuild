import { MoreHorizontal, User, DoorOpen } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { EntityListCard } from "@/components/shared/cards";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routePathBuilders } from "@/config/routes";
import { cn } from "@/lib/cn";
import type { Room } from "@/types/room";
import { formatCurrency } from "@/utils/currency";

import { RoomQuickDetailSheet } from "./room-quick-detail-sheet";
import {
  roomStatusConfig,
  roomTypeConfig,
} from "../domain/room-display-config";
import { useGroupedRooms } from "../hooks/use-grouped-rooms";

interface RoomGridProps {
  data: Room[];
}

export const RoomGrid = ({ data }: RoomGridProps) => {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { groupedByFloor, sortedFloors } = useGroupedRooms(data);

  return (
    <div className="space-y-8">
      {sortedFloors.map((floor) => (
        <div key={floor} className="space-y-4">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold tracking-tight text-foreground/80">
              Tầng {floor}
            </h3>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {groupedByFloor[floor]?.map((room) => {
              const statusCfg = roomStatusConfig[room.status];
              const typeCfg = roomTypeConfig[room.type];

              return (
                <EntityListCard
                  className={cn(
                    "group relative overflow-hidden transition-all hover:shadow-md cursor-pointer",
                    statusCfg.className,
                  )}
                  onClick={() => {
                    setSelectedRoom(room);
                    setIsSheetOpen(true);
                  }}
                  header={
                    <CardHeader className="pb-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-lg leading-none">
                            {room.name}
                          </h4>
                          <p className="text-[10px] mt-1 font-medium uppercase tracking-wider opacity-70">
                            {typeCfg.label} • {room.area}m²
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            asChild
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              className="h-6 w-6 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 data-[state=open]:opacity-100"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() =>
                                navigate(routePathBuilders.roomDetail(room.id))
                              }
                            >
                              Xem chi tiết phòng
                            </DropdownMenuItem>
                            <DropdownMenuItem>Lập hóa đơn</DropdownMenuItem>
                            <DropdownMenuItem>Chốt điện nước</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                  }
                  content={
                    <CardContent className="space-y-3 pt-3">
                      <div className="mt-auto pt-2 flex flex-col gap-2">
                        <div className="flex items-center gap-1.5 text-xs font-medium">
                          <User className="h-3.5 w-3.5 opacity-70" />
                          <span className="truncate opacity-90">
                            {room.tenant || "Trống"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm font-bold opacity-90">
                            {formatCurrency(room.price)}
                          </span>
                          <statusCfg.icon className="h-4 w-4 opacity-70" />
                        </div>
                      </div>
                    </CardContent>
                  }
                />
              );
            })}
          </div>
        </div>
      ))}

      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <DoorOpen className="h-12 w-12 text-muted-foreground/30" />
          <h3 className="mt-4 text-lg font-semibold">Không tìm thấy phòng</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Thử thay đổi bộ lọc hoặc thêm phòng mới.
          </p>
        </div>
      )}

      {isSheetOpen && (
        <RoomQuickDetailSheet
          room={selectedRoom}
          onClose={() => setIsSheetOpen(false)}
        />
      )}
    </div>
  );
};
