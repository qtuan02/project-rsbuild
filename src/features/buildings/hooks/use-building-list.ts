import { useMemo } from "react";

import { getBuildings } from "../data/building.repository";

export const useBuildingList = () => {
  const buildings = useMemo(
    () =>
      getBuildings().map((building) => ({
        ...building,
        occupancyRate: building.occupancyRate ?? 0,
      })),
    [],
  );

  return {
    buildings,
  };
};
