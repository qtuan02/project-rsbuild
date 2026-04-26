import { ExternalLink, Zap, Droplet } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { routePathBuilders } from "@/config/routes";
import type { Room } from "@/types/room";
import { formatCurrency } from "@/utils/currency";

import {
  roomStatusConfig,
  roomTypeConfig,
} from "../domain/room-display-config";

interface RoomQuickDetailSheetProps {
  room: Room | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RoomQuickDetailSheet = ({
  room,
  open,
  onOpenChange,
}: RoomQuickDetailSheetProps) => {
  const navigate = useNavigate();

  if (!room) return null;

  const statusCfg = roomStatusConfig[room.status];
  const typeCfg = roomTypeConfig[room.type];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col w-[400px] sm:w-[540px]">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-bold">{room.name}</SheetTitle>
            <div
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusCfg.className} bg-opacity-20`}
            >
              {statusCfg.label}
            </div>
          </div>
          <SheetDescription>
            {typeCfg.label} • Tầng {room.floor} • {room.area}m²
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 mt-6 space-y-6 overflow-y-auto p-4">
          {/* Thông tin thuê */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Thông tin thuê
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 p-3 rounded-lg">
                <span className="text-xs text-muted-foreground block mb-1">
                  Giá thuê
                </span>
                <span className="font-semibold text-lg">
                  {formatCurrency(room.price)}/tháng
                </span>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <span className="text-xs text-muted-foreground block mb-1">
                  Khách thuê
                </span>
                <span className="font-semibold">
                  {room.tenant || "Chưa có"}
                </span>
              </div>
            </div>
          </div>

          {/* Dịch vụ đang sử dụng */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Dịch vụ đang dùng
            </h4>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 border rounded-md px-3 py-2">
                <Zap className="h-4 w-4 text-amber-500" />
                <span className="text-sm">Điện (3,500đ/kWh)</span>
              </div>
              <div className="flex items-center gap-2 border rounded-md px-3 py-2">
                <Droplet className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Nước (20,000đ/m³)</span>
              </div>
            </div>
          </div>

          {/* Lịch sử đóng tiền gần đây - mock */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Hóa đơn gần nhất
            </h4>
            {room.tenant ? (
              <div className="border rounded-lg p-3 flex justify-between items-center">
                <div>
                  <p className="font-medium">Tháng 10/2023</p>
                  <p className="text-sm text-muted-foreground">
                    Hạn chót: 05/11/2023
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">Đã thanh toán</p>
                  <p className="font-semibold">
                    {formatCurrency(room.price + 150000)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground italic">
                Phòng đang trống
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t mt-auto flex flex-col gap-2">
          <Button
            className="w-full"
            onClick={() => {
              onOpenChange(false);
              navigate(routePathBuilders.roomDetail(room.id));
            }}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Xem trang chi tiết phòng
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" disabled={!room.tenant}>
              Lập hóa đơn
            </Button>
            <Button variant="outline">Chốt điện nước</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
