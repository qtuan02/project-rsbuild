import type { Utility } from "@/types/utility";

import { mockUtilities } from "./utility.mock";

export const getUtilities = (): Utility[] => mockUtilities;

export const getUtilityById = (id: string): Utility | undefined =>
  mockUtilities.find((u) => u.id === id);
