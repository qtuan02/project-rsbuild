import { useEffect, useMemo, useState } from "react";

import { getComplianceItems } from "../data/compliance.repository";
import { buildComplianceStatusStats } from "../domain/compliance-stats";

import type { ComplianceItem } from "../data/compliance.mock";

export const useComplianceDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<ComplianceItem[]>([]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 280));
        if (!cancelled) {
          setItems(getComplianceItems());
        }
      } catch {
        if (!cancelled) {
          setError("Không thể tải dữ liệu tuân thủ.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = useMemo(() => buildComplianceStatusStats(items), [items]);

  return {
    isLoading,
    error,
    items,
    stats,
  };
};
