import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  flexRender,
  type ColumnDef,
  type Row,
  type Table,
} from "@tanstack/react-table";
import * as React from "react";

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
  enableRowDrag?: boolean;
  onRowReorder?: (oldIndex: number, newIndex: number) => void;
}

function DraggableRow<TData>({ row }: { row: Row<TData> }) {
  const {
    transform,
    transition,
    setNodeRef,
    setActivatorNodeRef,
    isDragging,
    attributes,
    listeners,
  } = useSortable({
    id: row.id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: "relative",
    backgroundColor: isDragging ? "var(--accent)" : undefined,
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      data-state={row.getIsSelected() && "selected"}
    >
      {row.getVisibleCells().map((cell) => {
        if (cell.column.id === "drag-handle") {
          return (
            <TableCell key={cell.id} className="w-10">
              <div
                ref={setActivatorNodeRef}
                {...attributes}
                {...listeners}
                className="flex items-center justify-center outline-none"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            </TableCell>
          );
        }

        return (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

export const DataTableView = <TData, TValue>({
  table,
  columns,
  emptyTitle,
  emptyDescription,
  emptyIcon,
  resetFilters,
  enableRowDrag = false,
  onRowReorder,
}: DataTableViewProps<TData, TValue>) => {
  const rows = table.getRowModel().rows;
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  const handleDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      if (!enableRowDrag || !onRowReorder) {
        return;
      }

      const { active, over } = event;
      if (!active || !over || active.id === over.id) {
        return;
      }

      const currentRows = table.getRowModel().rows;
      const oldIndex = currentRows.findIndex((row) => row.id === active.id);
      const newIndex = currentRows.findIndex((row) => row.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        onRowReorder(oldIndex, newIndex);
      }
    },
    [enableRowDrag, onRowReorder, table],
  );

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

  const tableContent = (
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
          {enableRowDrag ? (
            <SortableContext
              items={rows.map((row) => row.id)}
              strategy={verticalListSortingStrategy}
            >
              {rows.map((row) => (
                <DraggableRow key={row.id} row={row} />
              ))}
            </SortableContext>
          ) : (
            rows.map((row) => (
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
            ))
          )}
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

  if (!enableRowDrag) {
    return tableContent;
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      {tableContent}
    </DndContext>
  );
};
