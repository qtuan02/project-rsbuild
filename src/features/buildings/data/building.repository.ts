import type { Building, BuildingOption } from "@/types/building";

import { mockBuildings } from "./building.mock";

export const getBuildings = (): Building[] => [...mockBuildings];

export const getBuildingById = (buildingId: string): Building | undefined =>
  getBuildings().find((item) => item.id === buildingId);

export const getBuildingOptions = (): BuildingOption[] =>
  getBuildings().map((item) => ({
    id: item.id,
    name: item.name,
  }));
