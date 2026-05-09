import type {
  Building,
  BuildingOption,
  CreateBuildingRequest,
} from "@/types/building";

import { mockBuildings } from "./building.mock";

const buildingRecords: Building[] = [...mockBuildings];

const generateBuildingId = (): string => {
  const nextIndex = buildingRecords.length + 1;
  return `b${nextIndex}`;
};

const normalizeBuilding = (building: Building): Building => ({
  ...building,
  totalRooms: building.totalRooms ?? 0,
  activeContracts: building.activeContracts ?? 0,
  availableRooms: building.availableRooms ?? 0,
  occupancyRate: building.occupancyRate ?? 0,
});

export const getBuildings = (): Building[] =>
  buildingRecords.map((building) => normalizeBuilding(building));

export const getBuildingById = (buildingId: string): Building | undefined =>
  getBuildings().find((item) => item.id === buildingId);

export const getBuildingOptions = (): BuildingOption[] =>
  getBuildings().map((item) => ({
    id: item.id,
    name: item.name,
  }));

export const createBuilding = (
  createBuildingRequest: CreateBuildingRequest,
): Building => {
  const nextBuilding: Building = {
    id: generateBuildingId(),
    name: createBuildingRequest.name,
    address: createBuildingRequest.address,
    totalFloors: createBuildingRequest.totalFloors,
    utilityCycleDay: createBuildingRequest.utilityCycleDay,
    note: createBuildingRequest.note,
    totalRooms: 0,
    activeContracts: 0,
    availableRooms: 0,
    occupancyRate: 0,
    description: createBuildingRequest.note,
  };

  buildingRecords.unshift(nextBuilding);
  return normalizeBuilding(nextBuilding);
};
