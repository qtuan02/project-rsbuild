import { mockBuildings } from "../data/buildings.mock";

export const useBuildingDetail = (buildingId: string) => {
  const building = mockBuildings.find((item) => item.id === buildingId);

  return {
    building,
  };
};
