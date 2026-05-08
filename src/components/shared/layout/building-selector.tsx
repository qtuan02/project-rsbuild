import { Building2 } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBuildingStore } from "@/stores/building.store";
import type { BuildingOption } from "@/types/building";

interface BuildingSelectorProps {
  options: BuildingOption[];
}

export const BuildingSelector = ({ options }: BuildingSelectorProps) => {
  const { selectedBuildingId, setSelectedBuildingId } = useBuildingStore();
  const selectorOptions = [{ id: "all", name: "Tất cả tòa nhà" }, ...options];

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
              selectorOptions.find(
                (item) => item.id === (selectedBuildingId || "all"),
              )?.name
            }
          </SelectValue>
        </SelectTrigger>
        <SelectContent position="popper" align="end" className="p-1">
          {selectorOptions.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
