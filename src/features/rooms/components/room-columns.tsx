import {
  CheckCircle2,
  Circle,
  Clock,
  Copy,
  Edit,
  Eye,
  GripVertical,
  MoreHorizontal,
  Trash2,
  Wrench,
} from 'lucide-react';

import { DataTableColumnHeader } from '@/components/shared/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { ColumnDef } from '@tanstack/react-table';

// ─── Types ───────────────────────────────────────────────────────────
export interface Room {
  id: string;
  name: string;
  floor: number;
  area: number;
  price: number;
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  type: 'single' | 'double' | 'studio' | 'suite';
  tenant: string | null;
  lastUpdated: string;
}

// ─── Status config ───────────────────────────────────────────────────
export const roomStatusConfig = {
  available: {
    label: 'Trống',
    variant: 'outline' as const,
    icon: Circle,
    className:
      'border-emerald-300 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
  },
  occupied: {
    label: 'Đã thuê',
    variant: 'default' as const,
    icon: CheckCircle2,
    className: 'bg-primary/10 text-primary border-primary/20',
  },
  maintenance: {
    label: 'Bảo trì',
    variant: 'secondary' as const,
    icon: Wrench,
    className:
      'border-amber-300 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
  },
  reserved: {
    label: 'Đã đặt',
    variant: 'secondary' as const,
    icon: Clock,
    className:
      'border-blue-300 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
  },
};

export const roomTypeConfig = {
  single: { label: 'Phòng đơn' },
  double: { label: 'Phòng đôi' },
  studio: { label: 'Studio' },
  suite: { label: 'Suite' },
};

// ─── Columns ─────────────────────────────────────────────────────────
export const columns: ColumnDef<Room>[] = [
  {
    id: 'drag-handle',
    header: '',
    cell: () => (
      <GripVertical className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing" />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Chọn tất cả"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Chọn dòng"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên phòng" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="font-medium">{row.getValue('name')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'floor',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tầng" />
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <Badge variant="outline" className="font-mono">
          T{row.getValue('floor')}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Loại phòng" />
    ),
    cell: ({ row }) => {
      const type = row.getValue('type') as Room['type'];
      return <span className="text-sm">{roomTypeConfig[type].label}</span>;
    },
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'area',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Diện tích"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right font-mono text-sm tabular-nums">
        {row.getValue('area')}m²
      </div>
    ),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Giá thuê"
        className="justify-end"
      />
    ),
    cell: ({ row }) => {
      const price = row.getValue('price') as number;
      const formatted = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(price);
      return (
        <div className="text-right font-medium tabular-nums">{formatted}</div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as Room['status'];
      const config = roomStatusConfig[status];
      const Icon = config.icon;

      return (
        <Badge variant={config.variant} className={config.className}>
          <Icon className="mr-1 h-3 w-3" />
          {config.label}
        </Badge>
      );
    },
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'tenant',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Khách thuê" />
    ),
    cell: ({ row }) => {
      const tenant = row.getValue('tenant') as string | null;
      return tenant ? (
        <span className="text-sm">{tenant}</span>
      ) : (
        <span className="text-sm text-muted-foreground italic">—</span>
      );
    },
  },
  {
    accessorKey: 'lastUpdated',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cập nhật" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.getValue('lastUpdated')}
      </span>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const room = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <span className="sr-only">Mở menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(room.id)}
              >
                <Copy className="mr-2 h-3.5 w-3.5" />
                Sao chép ID
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Eye className="mr-2 h-3.5 w-3.5" />
                Xem chi tiết
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-3.5 w-3.5" />
                Chỉnh sửa
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <Trash2 className="mr-2 h-3.5 w-3.5" />
              Xóa phòng
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// ─── Filter configs ──────────────────────────────────────────────────
export const statusFilterOptions = [
  { label: 'Trống', value: 'available', icon: Circle },
  { label: 'Đã thuê', value: 'occupied', icon: CheckCircle2 },
  { label: 'Bảo trì', value: 'maintenance', icon: Wrench },
  { label: 'Đã đặt', value: 'reserved', icon: Clock },
];

export const typeFilterOptions = [
  { label: 'Phòng đơn', value: 'single' },
  { label: 'Phòng đôi', value: 'double' },
  { label: 'Studio', value: 'studio' },
  { label: 'Suite', value: 'suite' },
];
