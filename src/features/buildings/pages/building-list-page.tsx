import { Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { routePathBuilders } from "@/config/routes";

import { BuildingFormDialog } from "../components/building-form-dialog";
import { useBuildingList } from "../hooks/use-building-list";

export const BuildingListPage = () => {
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { buildings } = useBuildingList();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quản lý Tòa nhà</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Quản lý danh sách các khu trọ, tòa nhà của bạn
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm tòa nhà
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {buildings.map((building) => {
          const occupancyRate = building.occupancyRate;
          return (
            <Card
              key={building.id}
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() =>
                navigate(routePathBuilders.buildingDetail(building.id))
              }
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{building.name}</CardTitle>
                <CardDescription>{building.address}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Tổng số phòng:
                    </span>
                    <span className="font-medium">{building.totalRooms}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Phòng trống:</span>
                    <span className="font-medium text-green-600">
                      {building.availableRooms}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Tỷ lệ lấp đầy:
                    </span>
                    <span className="font-medium">{occupancyRate}%</span>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className={`h-full ${occupancyRate >= 90 ? "bg-primary" : occupancyRate >= 50 ? "bg-amber-500" : "bg-red-500"}`}
                      style={{ width: `${occupancyRate}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <BuildingFormDialog open={isFormOpen} onOpenChange={setIsFormOpen} />
    </div>
  );
};
