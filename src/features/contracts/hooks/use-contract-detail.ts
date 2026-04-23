import { useCallback, useMemo, useState } from "react";

import { getContracts } from "../data/contract.repository";
import { getContractExpiryMeta } from "../domain/contract-detail";
import { contractStatusConfig } from "../domain/contract-display-config";

export interface UseContractDetailOptions {
  contractId: string;
  onBack?: () => void;
}

export const useContractDetail = ({
  contractId,
  onBack,
}: UseContractDetailOptions) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const contract = useMemo(
    () => getContracts().find((item) => item.id === contractId),
    [contractId],
  );
  const statusConfig = useMemo(
    () => (contract ? contractStatusConfig[contract.status] : undefined),
    [contract],
  );
  const expiryMeta = useMemo(
    () => (contract ? getContractExpiryMeta(contract) : undefined),
    [contract],
  );
  const depositAmount = contract
    ? (contract.depositAmount ?? contract.rentAmount)
    : 0;

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsDeleting(false);
    setDeleteDialogOpen(false);
    onBack?.();
  }, [onBack]);

  return {
    contract,
    statusConfig,
    expiryMeta,
    depositAmount,
    deleteDialogOpen,
    isDeleting,
    setDeleteDialogOpen,
    handleDelete,
  };
};
