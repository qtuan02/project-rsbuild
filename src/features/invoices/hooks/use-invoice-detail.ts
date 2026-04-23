import { useCallback, useMemo, useState } from "react";

import { getInvoices } from "../data/invoice.repository";

export interface UseInvoiceDetailOptions {
  invoiceId: string;
  onBack?: () => void;
}

export const useInvoiceDetail = ({
  invoiceId,
  onBack,
}: UseInvoiceDetailOptions) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const invoice = useMemo(
    () => getInvoices().find((item) => item.id === invoiceId),
    [invoiceId],
  );

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsDeleting(false);
    setDeleteDialogOpen(false);
    onBack?.();
  }, [onBack]);

  return {
    invoice,
    deleteDialogOpen,
    isDeleting,
    setDeleteDialogOpen,
    handleDelete,
  };
};
