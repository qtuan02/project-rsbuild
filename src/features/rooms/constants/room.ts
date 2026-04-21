import { CheckCircle2, Circle, Clock, Wrench } from 'lucide-react';

import type { RoomStatus, RoomType } from '@/types/room';

export const roomStatusConfig: Record<
  RoomStatus,
  {
    label: string;
    variant: 'outline' | 'default' | 'secondary';
    icon: typeof Circle;
    className: string;
  }
> = {
  available: {
    label: 'Trống',
    variant: 'outline',
    icon: Circle,
    className:
      'border-emerald-300 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
  },
  occupied: {
    label: 'Đã thuê',
    variant: 'default',
    icon: CheckCircle2,
    className: 'bg-primary/10 text-primary border-primary/20',
  },
  maintenance: {
    label: 'Bảo trì',
    variant: 'secondary',
    icon: Wrench,
    className:
      'border-amber-300 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
  },
  reserved: {
    label: 'Đã đặt',
    variant: 'secondary',
    icon: Clock,
    className:
      'border-blue-300 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
  },
};

export const roomTypeConfig: Record<RoomType, { label: string }> = {
  single: { label: 'Phòng đơn' },
  double: { label: 'Phòng đôi' },
  studio: { label: 'Studio' },
  suite: { label: 'Suite' },
};

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
