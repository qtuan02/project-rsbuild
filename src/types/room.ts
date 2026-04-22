export type RoomStatus = "available" | "occupied" | "maintenance" | "reserved";

export type RoomType = "single" | "double" | "studio" | "suite";

export interface Room {
  id: string;
  name: string;
  floor: number;
  area: number;
  price: number;
  status: RoomStatus;
  type: RoomType;
  tenant: string | null;
  lastUpdated: string;
}
