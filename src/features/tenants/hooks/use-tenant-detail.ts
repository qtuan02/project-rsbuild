import { useCallback, useMemo, useState } from "react";

import { getTenants } from "../data/tenant.repository";

export interface UseTenantDetailOptions {
  tenantId: string;
  onBack?: () => void;
}

export const useTenantDetail = ({
  tenantId,
  onBack,
}: UseTenantDetailOptions) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const tenant = useMemo(
    () => getTenants().find((item) => item.id === tenantId),
    [tenantId],
  );

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsDeleting(false);
    setDeleteDialogOpen(false);
    onBack?.();
  }, [onBack]);

  return {
    tenant,
    deleteDialogOpen,
    isDeleting,
    setDeleteDialogOpen,
    handleDelete,
  };
};
