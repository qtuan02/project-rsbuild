import { getBuildingById } from "../data/building.repository";

export const useBuildingDetail = (buildingId: string) => {
  const building = getBuildingById(buildingId);

  return {
    building,
  };
};
