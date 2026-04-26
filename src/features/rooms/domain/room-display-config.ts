import { CheckCircle2, Circle, Clock, Wrench } from "lucide-react";
import { STATUS_COLORS } from "@/config/colors";

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
    className: cn(
      `${STATUS_COLORS.success.light.border} ${STATUS_COLORS.success.light.bg} ${STATUS_COLORS.success.light.text} ${STATUS_COLORS.success.dark.bg} ${STATUS_COLORS.success.dark.text} ${STATUS_COLORS.success.dark.border}`,
    ),
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
    className: cn(
      `${STATUS_COLORS.error.light.border} ${STATUS_COLORS.error.light.bg} ${STATUS_COLORS.error.light.text} ${STATUS_COLORS.error.dark.bg} ${STATUS_COLORS.error.dark.text} ${STATUS_COLORS.error.dark.border}`,
    ),
  },
  reserved: {
    label: "Đã đặt",
    variant: "secondary",
    icon: Clock,
    className: cn(
      `${STATUS_COLORS.info.light.border} ${STATUS_COLORS.info.light.bg} ${STATUS_COLORS.info.light.text} ${STATUS_COLORS.info.dark.bg} ${STATUS_COLORS.info.dark.text} ${STATUS_COLORS.info.dark.border}`,
    ),
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
