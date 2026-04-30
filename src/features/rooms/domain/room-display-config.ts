import { CheckCircle2, Circle, Clock, Wrench } from "lucide-react";

import { getStatusClassName } from "@/config/colors";
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
    className: getStatusClassName("warning"),
  },
  occupied: {
    label: "Đã thuê",
    variant: "default",
    icon: CheckCircle2,
    className: getStatusClassName("success"),
  },
  maintenance: {
    label: "Bảo trì",
    variant: "secondary",
    icon: Wrench,
    className: getStatusClassName("error"),
  },
  reserved: {
    label: "Đã đặt",
    variant: "secondary",
    icon: Clock,
    className: getStatusClassName("info"),
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
