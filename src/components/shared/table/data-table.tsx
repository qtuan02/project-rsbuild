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
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  flexRender,
  type ColumnDef,
  type Table as TanstackTable,
  type Row,
} from "@tanstack/react-table";
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import {
  DataTableToolbar,
  type DataTableFilterableColumn,
  type DataTableSearchableColumn,
} from "./data-table-toolbar";
import { useDataTable } from "./use-data-table";

interface DataTableBaseProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterableColumns?: DataTableFilterableColumn<TData>[];
  searchableColumns?: DataTableSearchableColumn<TData>[];
  toolbarActions?: React.ReactNode;
}

interface DataTableDragProps<TData> {
  enableRowDrag: true;
  onRowReorder: (oldIndex: number, newIndex: number) => void;
  getRowId: (row: TData) => string;
}

interface DataTableStaticProps {
  enableRowDrag?: false;
  onRowReorder?: never;
  getRowId?: never;
}

type DataTableProps<TData, TValue> = DataTableBaseProps<TData, TValue> &
  (DataTableDragProps<TData> | DataTableStaticProps);

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

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  const {
    columns,
    data,
    filterableColumns = [],
    searchableColumns = [],
    toolbarActions,
  } = props;
  const enableRowDrag = props.enableRowDrag ?? false;
  const onRowReorder = props.enableRowDrag ? props.onRowReorder : undefined;
  const getRowId = props.enableRowDrag ? props.getRowId : undefined;

  const { table } = useDataTable({
    data,
    columns,
    getRowId,
  });

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id && onRowReorder) {
      const activeIndex = data.findIndex((row) =>
        getRowId ? getRowId(row) === active.id : false,
      );
      const overIndex = data.findIndex((row) =>
        getRowId ? getRowId(row) === over.id : false,
      );
      if (activeIndex !== -1 && overIndex !== -1) {
        onRowReorder(activeIndex, overIndex);
      }
    }
  };

  const TableContent = (
    <div className="overflow-hidden rounded-lg border">
      <Table>
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
          {table.getRowModel().rows?.length ? (
            enableRowDrag ? (
              <SortableContext
                items={table.getRowModel().rows.map((row) => row.id)}
                strategy={verticalListSortingStrategy}
              >
                {table.getRowModel().rows.map((row) => (
                  <DraggableRow key={row.id} row={row} />
                ))}
              </SortableContext>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <div className="flex flex-col items-center gap-1 text-muted-foreground">
                  <span className="text-lg">📭</span>
                  <span className="text-sm">Không có dữ liệu</span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        filterableColumns={filterableColumns}
        searchableColumns={searchableColumns}
      >
        {toolbarActions}
      </DataTableToolbar>

      {enableRowDrag ? (
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          {TableContent}
        </DndContext>
      ) : (
        TableContent
      )}

      <DataTablePagination table={table} />
    </div>
  );
}

export type { TanstackTable };
