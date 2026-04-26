import { useMemo } from "react";

export const useBatchInvoiceSelection = (
  selectedIds: string[],
  allIds: string[],
  onSelectedIdsChange: (next: string[]) => void,
) => {
  const isAllSelected = useMemo(
    () => allIds.length > 0 && selectedIds.length === allIds.length,
    [allIds, selectedIds],
  );

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelectedIdsChange(selectedIds.filter((itemId) => itemId !== id));
      return;
    }
    onSelectedIdsChange([...selectedIds, id]);
  };

  const toggleSelectAll = () => {
    onSelectedIdsChange(isAllSelected ? [] : allIds);
  };

  return {
    isAllSelected,
    toggleSelect,
    toggleSelectAll,
  };
};
