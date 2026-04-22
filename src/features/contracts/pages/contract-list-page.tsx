import { Download, Plus } from "lucide-react";

import { DataTable } from "@/components/shared/table";
import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/components/shared/table";
import { Button } from "@/components/ui/button";
import type { Contract } from "@/types/contract";

import { columns } from "../components/contract-columns";
import { useContractList } from "../hooks/use-contract-list";

export const ContractListPage = () => {
  const { data, searchableColumns, filterableColumns, onRowReorder } =
    useContractList();
  const tableSearchableColumns: DataTableSearchableColumn<Contract>[] =
    searchableColumns;
  const tableFilterableColumns: DataTableFilterableColumn<Contract>[] =
    filterableColumns;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Quản lý hợp đồng
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Theo dõi toàn bộ hợp đồng thuê trọ, thời hạn và trạng thái.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Xuất Excel
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Thêm hợp đồng
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data}
        searchableColumns={tableSearchableColumns}
        filterableColumns={tableFilterableColumns}
        enableRowDrag
        getRowId={(row) => row.id}
        onRowReorder={onRowReorder}
      />
    </div>
  );
};
