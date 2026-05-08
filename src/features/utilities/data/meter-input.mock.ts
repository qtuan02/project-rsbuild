export interface MeterInputRoomItem {
  id: string;
  name: string;
  lastElectricity: number;
  lastWater: number;
}

export const mockMeterInputRooms: MeterInputRoomItem[] = [
  { id: "1", name: "101", lastElectricity: 1250, lastWater: 450 },
  { id: "2", name: "102", lastElectricity: 3400, lastWater: 890 },
  { id: "3", name: "103", lastElectricity: 2100, lastWater: 560 },
  { id: "4", name: "201", lastElectricity: 1560, lastWater: 320 },
  { id: "5", name: "202", lastElectricity: 4200, lastWater: 1100 },
];
