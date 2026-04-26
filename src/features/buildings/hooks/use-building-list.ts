import { useMemo } from "react";

import { mockBuildings } from "../data/buildings.mock";

export const useBuildingList = () => {
  const buildings = useMemo(
    () =>
      mockBuildings.map((building) => ({
        ...building,
        occupancyRate: building.occupancyRate ?? 0,
      })),
    [],
  );

  return {
    buildings,
  };
};
