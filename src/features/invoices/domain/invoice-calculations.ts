export interface BatchInvoiceItem {
  id: string;
  room: string;
  tenant: string;
  rent: number;
  electricity: number;
  water: number;
  service: number;
}

export const getUtilitySubtotal = (item: BatchInvoiceItem) =>
  item.electricity + item.water;

export const getInvoiceTotal = (item: BatchInvoiceItem) =>
  item.rent + getUtilitySubtotal(item) + item.service;
