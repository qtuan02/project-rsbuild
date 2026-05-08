import type { ReconciliationItem } from "@/types/reconciliation";

import { mockReconciliationData } from "./reconciliation.mock";

export const getReconciliationItems = (): ReconciliationItem[] => [
  ...mockReconciliationData,
];
