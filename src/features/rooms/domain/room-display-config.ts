import { CheckCircle2, Circle, Clock, Wrench } from "lucide-react";

import { cn } from "@/lib/cn";
import type { RoomStatus, RoomType } from "@/types/room";

export const roomStatusConfig: Record<
  RoomStatus,
  {
    label: string;
    variant: "outline" | "default" | "secondary";
    icon: typeof Circle;
    className: string;
  }
> = {
  available: {
    label: "Trống",
    variant: "outline",
    icon: Circle,
    className:
      cn("border-orange-300 bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800"),
  },
  occupied: {
    label: "Đã thuê",
    variant: "default",
    icon: CheckCircle2,
    className: cn("bg-primary/10 text-primary border-primary/20"),
  },
  maintenance: {
    label: "Bảo trì",
    variant: "secondary",
    icon: Wrench,
    className:
      cn("border-red-300 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 dark:border-red-800"),
  },
  reserved: {
    label: "Đã đặt",
    variant: "secondary",
    icon: Clock,
    className:
      cn("border-blue-300 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800"),
  },
};

export const roomTypeConfig: Record<RoomType, { label: string }> = {
  single: { label: "Phòng đơn" },
  double: { label: "Phòng đôi" },
  studio: { label: "Studio" },
  suite: { label: "Suite" },
};

export const statusFilterOptions = [
  { label: "Trống", value: "available", icon: Circle },
  { label: "Đã thuê", value: "occupied", icon: CheckCircle2 },
  { label: "Bảo trì", value: "maintenance", icon: Wrench },
  { label: "Đã đặt", value: "reserved", icon: Clock },
];

export const typeFilterOptions = [
  { label: "Phòng đơn", value: "single" },
  { label: "Phòng đôi", value: "double" },
  { label: "Studio", value: "studio" },
  { label: "Suite", value: "suite" },
];
