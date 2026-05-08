import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { getComplianceItems } from "../data/compliance.repository";
import { buildComplianceStatusStats } from "../domain/compliance-stats";

export const useComplianceDashboard = () => {
  const complianceItemsQuery = useQuery({
    queryKey: ["compliance", "items"],
    queryFn: getComplianceItems,
  });

  const items = useMemo(
    () => complianceItemsQuery.data ?? [],
    [complianceItemsQuery.data],
  );
  const stats = useMemo(() => buildComplianceStatusStats(items), [items]);

  return {
    isLoading: complianceItemsQuery.isLoading,
    error: complianceItemsQuery.error
      ? "Không thể tải dữ liệu tuân thủ."
      : null,
    items,
    stats,
  };
};
