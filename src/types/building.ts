export interface Building {
  id: string;
  name: string;
  address: string;
  totalFloors?: number;
  utilityCycleDay?: number; // 1-31
  note?: string;
  imageUrl?: string;
  totalRooms?: number;
  activeContracts?: number;
  availableRooms?: number;
  occupancyRate?: number;
  description?: string;
}
