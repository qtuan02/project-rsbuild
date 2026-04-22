import type { Invoice } from "@/types/invoice";
import { mockInvoices } from "./invoice.mock";

export const getInvoices = (): Invoice[] => {
  return [...mockInvoices];
};
