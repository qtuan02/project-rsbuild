import { useState } from "react";

import type { Building, CreateBuildingRequest } from "@/types/building";

import { createBuilding, getBuildings } from "../data/building.repository";

const normalizeBuilding = (building: Building): Building => ({
  ...building,
  occupancyRate: building.occupancyRate ?? 0,
});

export const useBuildingList = () => {
  const [buildings, setBuildings] = useState<Building[]>(() =>
    getBuildings().map((building) => normalizeBuilding(building)),
  );

  const handleCreateBuilding = (
    createBuildingRequest: CreateBuildingRequest,
  ) => {
    const newBuilding = createBuilding(createBuildingRequest);
    setBuildings((previousBuildings) => [
      normalizeBuilding(newBuilding),
      ...previousBuildings,
    ]);
  };

  return {
    buildings,
    handleCreateBuilding,
  };
};
