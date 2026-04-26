import { InfoCard, InfoRow } from "@/components/shared/cards/info-card";
import { DetailPageShell } from "@/components/shared/layout/detail-page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      <Card>
        <CardHeader>
          <CardTitle>{building.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">{building.address}</p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className={`h-full ${
                occupancyRate >= 90
                  ? "bg-primary"
                  : occupancyRate >= 50
                    ? "bg-amber-500"
                    : "bg-red-500"
              }`}
              style={{ width: `${occupancyRate}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <InfoCard title="Thông tin tòa nhà">
        <InfoRow label="Mã tòa nhà" value={building.id} />
        <InfoRow label="Tên tòa nhà" value={building.name} />
        <InfoRow label="Địa chỉ" value={building.address} />
        <InfoRow
          label="Tổng số phòng"
          value={String(building.totalRooms ?? 0)}
        />
        <InfoRow
          label="Hợp đồng đang hoạt động"
          value={String(building.activeContracts ?? 0)}
        />
        <InfoRow
          label="Phòng trống"
          value={String(building.availableRooms ?? 0)}
        />
        <InfoRow label="Tỷ lệ lấp đầy" value={`${occupancyRate}%`} highlight />
        <InfoRow label="Mô tả" value={building.description ?? "---"} />
      </InfoCard>
    </DetailPageShell>
  );
};
