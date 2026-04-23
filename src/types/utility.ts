export type UtilityType = "electricity" | "water";
export type UtilityStatus = "draft" | "verified" | "anomaly";

export interface Utility {
  id: string;
  roomId: string;
  roomName: string;
  month: string; // YYYY-MM format
  type: UtilityType;
  oldIndex: number;
  newIndex: number;
  consumption: number;
  status: UtilityStatus;
  updatedAt: string;
  proofImages: string[];
}
