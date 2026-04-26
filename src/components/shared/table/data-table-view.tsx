import { flexRender, type ColumnDef, type Table } from "@tanstack/react-table";

import { EmptyPanel } from "@/components/shared/panels";
import {
  Table as UiTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { LucideIcon } from "lucide-react";

interface DataTableViewProps<TData, TValue> {
  table: Table<TData>;
  columns: ColumnDef<TData, TValue>[];
  emptyTitle: string;
  emptyDescription: string;
  emptyIcon?: LucideIcon;
  resetFilters?: () => void;
}

export const DataTableView = <TData, TValue>({
  table,
  columns,
  emptyTitle,
  emptyDescription,
  emptyIcon,
  resetFilters,
}: DataTableViewProps<TData, TValue>) => {
  const rows = table.getRowModel().rows;

  if (!rows.length) {
    return (
      <div className="py-12 border-2 border-dashed rounded-xl">
        <EmptyPanel
          icon={emptyIcon}
          title={emptyTitle}
          description={emptyDescription}
          action={
            resetFilters
              ? {
                  label: "Xóa toàn bộ bộ lọc",
                  onClick: resetFilters,
                }
              : undefined
          }
        />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <UiTable>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-muted/40 hover:bg-muted/40"
            >
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {!rows.length && (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Không có dữ liệu
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </UiTable>
    </div>
  );
};
