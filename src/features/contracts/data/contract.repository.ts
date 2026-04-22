import type { Contract } from "@/types/contract";
import { mockContracts } from "./contract.mock";

export const getContracts = (): Contract[] => {
  return [...mockContracts];
};
