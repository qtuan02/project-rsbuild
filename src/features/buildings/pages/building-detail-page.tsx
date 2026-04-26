import { InfoCard, InfoRow } from "@/components/shared/cards/info-card";
import { DetailPageShell } from "@/components/shared/layout/detail-page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { STATUS_COLORS } from "@/config/colors";
import { cn } from "@/lib/cn";

import { useBuildingDetail } from "../hooks/use-building-detail";

interface BuildingDetailPageProps {
  buildingId: string;
  onBack?: () => void;
}

export const BuildingDetailPage = ({
  buildingId,
  onBack,
}: BuildingDetailPageProps) => {
  const { building } = useBuildingDetail(buildingId);

  if (!building) {
    return (
      <DetailPageShell onBack={onBack}>
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            Không tìm thấy tòa nhà.
          </CardContent>
        </Card>
      </DetailPageShell>
    );
  }

  const occupancyRate = building.occupancyRate ?? 0;

  return (
    <DetailPageShell onBack={onBack}>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl">{building.name}</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                {building.address}
              </p>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Tổng phòng
                </p>
                <p className="mt-1.5 text-base font-semibold">
                  {building.totalRooms ?? 0}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Phòng trống
                </p>
                <p
                  className={cn(
                    "mt-1.5 text-base font-semibold",
                    STATUS_COLORS.success.light.text,
                  )}
                >
                  {building.availableRooms ?? 0}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Đang hoạt động
                </p>
                <p className="mt-1.5 text-base font-semibold">
                  {building.activeContracts ?? 0}
                </p>
              </div>
            </CardContent>
          </Card>

          <InfoCard title="Thông tin tòa nhà">
            <InfoRow label="Mã tòa nhà" value={building.id} />
            <InfoRow label="Tên tòa nhà" value={building.name} />
            <InfoRow label="Địa chỉ" value={building.address} />
            <InfoRow label="Mô tả" value={building.description ?? "---"} />
          </InfoCard>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tỷ lệ Lấp đầy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted/50 p-4">
                <div className="text-center">
                  <p className="text-3xl font-bold">{occupancyRate}%</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Tỷ lệ chiếm dụng
                  </p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-muted-foreground">Lấp đầy</span>
                  <span className="font-medium">{occupancyRate}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${occupancyRate}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DetailPageShell>
  );
};
