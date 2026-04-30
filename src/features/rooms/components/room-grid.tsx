import { User, DoorOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { EntityListCard } from "@/components/shared/cards";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/libs/cn";
import type { Room } from "@/types/room";
import { formatCurrency } from "@/utils/currency";

import { RoomRowActions } from "./room-row-actions";
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
                  className="group relative overflow-hidden transition-all hover:shadow-md pt-0"
                  header={
                    <CardHeader className={cn("py-4", statusCfg.className)}>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-lg leading-none">
                            {room.name}
                          </h4>
                          <p className="text-[10px] mt-1 font-medium uppercase tracking-wider opacity-70">
                            {typeCfg.label} • {room.area}m²
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                  }
                  content={
                    <CardContent className="space-y-3">
                      <div className="mt-auto flex flex-col gap-2">
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
                  footer={
                    <CardFooter className="px-4 py-2 flex justify-end">
                      <RoomRowActions room={room} side="top" />
                    </CardFooter>
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
    </div>
  );
};
