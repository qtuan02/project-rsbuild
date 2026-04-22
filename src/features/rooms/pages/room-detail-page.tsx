import { Edit, Download, Trash2, ArrowLeft } from "lucide-react";
import { useState } from "react";

import { RoomStatusBadge } from "@/components/shared/badges/room-status-badge";
import { InfoCard, InfoRow } from "@/components/shared/cards/info-card";
import { ConfirmActionDialog } from "@/components/shared/dialogs/confirm-action-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/currency";

import { getRooms } from "../data/room.repository";
import { roomTypeConfig } from "../domain/room-display-config";

interface RoomDetailPageProps {
  roomId: string;
  onBack?: () => void;
}

export const RoomDetailPage = ({ roomId, onBack }: RoomDetailPageProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const room = getRooms().find((r) => r.id === roomId);

  if (!room) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </Button>
        <div className="rounded-lg border border-dashed bg-card/50 p-12 text-center">
          <h3 className="text-base font-semibold">Không tìm thấy phòng</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Phòng bạn tìm kiếm không tồn tại.
          </p>
        </div>
      </div>
    );
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsDeleting(false);
    setDeleteDialogOpen(false);
    onBack?.();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            In phòng
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Edit className="h-4 w-4" />
            Chỉnh sửa
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-destructive hover:text-destructive"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
            Xóa
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{room.name}</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Tầng {room.floor}
                  </p>
                </div>
                <RoomStatusBadge status={room.status} />
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Loại phòng
                </p>
                <p className="mt-1.5 text-base font-semibold">
                  {roomTypeConfig[room.type].label}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Diện tích
                </p>
                <p className="mt-1.5 text-base font-semibold">{room.area}m²</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Giá thuê/tháng
                </p>
                <p className="mt-1.5 text-base font-semibold">
                  {formatCurrency(room.price)}
                </p>
              </div>
            </CardContent>
          </Card>

          <InfoCard title="Thông tin cơ bản">
            <InfoRow label="ID phòng" value={room.id} />
            <InfoRow label="Tầng" value={`Tầng ${room.floor}`} />
            <InfoRow
              label="Loại phòng"
              value={roomTypeConfig[room.type].label}
            />
            <InfoRow label="Diện tích" value={`${room.area}m²`} />
            <InfoRow
              label="Giá thuê/tháng"
              value={formatCurrency(room.price)}
              highlight
            />
            <InfoRow label="Cập nhật lần cuối" value={room.lastUpdated} />
          </InfoCard>

          <InfoCard title="Thông tin khách thuê">
            {room.tenant ? (
              <>
                <InfoRow label="Tên khách" value={room.tenant} highlight />
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Xem hồ sơ khách thuê
                </Button>
              </>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                Phòng này hiện chưa có khách thuê
              </p>
            )}
          </InfoCard>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Trạng thái hiện tại</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted/50 p-4">
                <RoomStatusBadge
                  status={room.status}
                  className="w-full justify-center"
                />
              </div>

              <div className="space-y-2 text-sm">
                {room.status === "occupied" && (
                  <>
                    <p className="font-medium">Khách thuê hiện tại</p>
                    <p className="text-muted-foreground">{room.tenant}</p>
                  </>
                )}
                {room.status === "available" && (
                  <p className="text-emerald-700 dark:text-emerald-300 font-medium">
                    Sẵn sàng cho khách mới
                  </p>
                )}
                {room.status === "maintenance" && (
                  <p className="text-amber-700 dark:text-amber-300 font-medium">
                    Đang trong quá trình bảo trì
                  </p>
                )}
                {room.status === "reserved" && (
                  <p className="text-blue-700 dark:text-blue-300 font-medium">
                    Đã được đặt trước
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Chi tiết thanh toán</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Giá thuê hàng tháng
                </p>
                <p className="text-lg font-bold text-foreground">
                  {formatCurrency(room.price)}
                </p>
              </div>
              <Separator />
              <Button variant="outline" className="w-full" size="sm">
                Xem lịch sử thanh toán
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Nhanh chóng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                Tạo hóa đơn
              </Button>
              {room.tenant && (
                <Button variant="outline" size="sm" className="w-full">
                  Xem hợp đồng
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ConfirmActionDialog
        open={deleteDialogOpen}
        title="Xóa phòng"
        description={`Bạn có chắc chắn muốn xóa phòng "${room.name}" không? Hành động này không thể hoàn tác.`}
        actionLabel="Xóa"
        variant="destructive"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialogOpen(false)}
      />
    </div>
  );
};
