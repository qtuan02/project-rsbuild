import { Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { EntityListCard } from "@/components/shared/cards/entity-list-card";
import { ListPageHeader } from "@/components/shared/list";
import {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { STATUS_COLORS } from "@/config/colors";
import { routePathBuilders } from "@/config/routes";
import { cn } from "@/lib/cn";

import { BuildingFormDialog } from "../components/building-form-dialog";
import { useBuildingList } from "../hooks/use-building-list";

export const BuildingListPage = () => {
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { buildings } = useBuildingList();

  return (
    <div className="space-y-6">
      <ListPageHeader
        title="Quản lý Tòa nhà"
        description="Quản lý danh sách các khu trọ, tòa nhà của bạn"
        actions={[
          {
            key: "add",
            label: "Thêm tòa nhà",
            icon: <Plus className="mr-2 h-4 w-4" />,
            onClick: () => setIsFormOpen(true),
          },
        ]}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {buildings.map((building) => {
          const occupancyRate = building.occupancyRate;

          return (
            <EntityListCard
              key={building.id}
              header={
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{building.name}</CardTitle>
                  <CardDescription>{building.address}</CardDescription>
                </CardHeader>
              }
              content={
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Tổng phòng
                      </p>
                      <p className="mt-1.5 text-base font-semibold">
                        {building.totalRooms}
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
                        {building.availableRooms}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Lấp đầy
                      </span>
                      <span className="text-sm font-semibold">
                        {occupancyRate}%
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${occupancyRate}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              }
              className="cursor-pointer"
              onClick={() => {
                navigate(routePathBuilders.buildingDetail(building.id));
              }}
            />
          );
        })}
      </div>

      <BuildingFormDialog open={isFormOpen} onOpenChange={setIsFormOpen} />
    </div>
  );
};
