import * as React from "react";

import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/components/shared/table";
import type { Invoice } from "@/types/invoice";

import { getInvoices } from "../data/invoice.repository";
import { invoiceStatusConfig } from "../domain/invoice-display-config";
import { buildInvoiceSummaryStats } from "../domain/invoice-stats";

export interface UseInvoiceListResult {
  data: Invoice[];
  summaryStats: ReturnType<typeof buildInvoiceSummaryStats>;
  searchableColumns: DataTableSearchableColumn<Invoice>[];
  filterableColumns: DataTableFilterableColumn<Invoice>[];
}

export const useInvoiceList = (): UseInvoiceListResult => {
  const [data] = React.useState<Invoice[]>(() => getInvoices());

  const summaryStats = React.useMemo(
    () => buildInvoiceSummaryStats(data),
    [data],
  );
  const searchableColumns = React.useMemo<DataTableSearchableColumn<Invoice>[]>(
    () => [
      { id: "invoiceNumber", title: "số hóa đơn" },
      { id: "tenant", title: "khách thuê" },
    ],
    [],
  );
  const filterableColumns = React.useMemo<DataTableFilterableColumn<Invoice>[]>(
    () => [
      {
        id: "status",
        title: "Trạng thái",
        options: Object.entries(invoiceStatusConfig).map(([key, config]) => ({
          value: key,
          label: config.label,
        })),
      },
    ],
    [],
  );

  return {
    data,
    summaryStats,
    searchableColumns,
    filterableColumns,
  };
};
