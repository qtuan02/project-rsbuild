import type { Utility } from "@/types/utility";

export interface UtilityStats {
  totalReadings: number;
  anomalyCount: number;
  pendingVerifyCount: number;
}

export const calculateUtilityStats = (utilities: Utility[]): UtilityStats => {
  return {
    totalReadings: utilities.length,
    anomalyCount: utilities.filter((u) => u.status === "anomaly").length,
    pendingVerifyCount: utilities.filter((u) => u.status === "draft").length,
  };
};
