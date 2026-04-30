import { Building2 } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockBuildings as rawBuildings } from "@/features/buildings/data/buildings";
import { useBuildingStore } from "@/stores/building.store";

const mockBuildings = [{ id: "all", name: "Tất cả tòa nhà" }, ...rawBuildings];

export const BuildingSelector = () => {
  const { selectedBuildingId, setSelectedBuildingId } = useBuildingStore();

  return (
    <div className="w-full">
      <Select
        value={selectedBuildingId || "all"}
        onValueChange={(val) =>
          setSelectedBuildingId(val === "all" ? null : val)
        }
      >
        <SelectTrigger className="w-full flex items-center gap-2 border-none bg-transparent hover:bg-accent px-2 py-1.5 h-9 shadow-none focus:ring-0">
          <Building2 className="h-4 w-4 shrink-0 text-muted-foreground" />
          <SelectValue>
            {
              mockBuildings.find((b) => b.id === (selectedBuildingId || "all"))
                ?.name
            }
          </SelectValue>
        </SelectTrigger>
        <SelectContent position="popper" align="end" className="p-1">
          {mockBuildings.map((building) => (
            <SelectItem key={building.id} value={building.id}>
              {building.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
