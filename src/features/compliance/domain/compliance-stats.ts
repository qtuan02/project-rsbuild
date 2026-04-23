import type { ComplianceItem } from "../data/compliance.mock";

export interface ComplianceStatusStats {
  completed: number;
  pending: number;
  overdue: number;
}

export const buildComplianceStatusStats = (
  items: ComplianceItem[],
): ComplianceStatusStats => ({
  completed: items.filter((i) => i.status === "completed").length,
  pending: items.filter((i) => i.status === "pending").length,
  overdue: items.filter((i) => i.status === "overdue").length,
});
