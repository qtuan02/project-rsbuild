import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Room, RoomStatus, RoomType } from "@/types/room";

import { roomTypeConfig } from "../domain/room-display-config";

interface RoomFormProps {
  room?: Room;
  onSubmit: (data: Partial<Room>) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export const RoomForm = ({
  room,
  onSubmit,
  onCancel,
  isLoading = false,
}: RoomFormProps) => {
  const [formData, setFormData] = useState<Partial<Room>>(
    room ?? {
      name: "",
      floor: 1,
      area: 20,
      price: 2500000,
      status: "available" as RoomStatus,
      type: "single" as RoomType,
      tenant: null,
    },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Thông tin cơ bản</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Tên phòng</Label>
              <Input
                id="name"
                placeholder="VD: Phòng 101"
                value={formData.name ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="floor">Tầng</Label>
              <Input
                id="floor"
                type="number"
                min="1"
                value={formData.floor ?? 1}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    floor: parseInt(e.target.value),
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Loại phòng</Label>
              <Select
                value={formData.type ?? "single"}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, type: value as RoomType }))
                }
              >
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(roomTypeConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Diện tích (m²)</Label>
              <Input
                id="area"
                type="number"
                min="1"
                value={formData.area ?? 20}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    area: parseInt(e.target.value),
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Giá thuê/tháng</Label>
              <Input
                id="price"
                type="number"
                min="0"
                value={formData.price ?? 2500000}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    price: parseInt(e.target.value),
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Select
                value={formData.status ?? "available"}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: value as RoomStatus,
                  }))
                }
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Trống</SelectItem>
                  <SelectItem value="occupied">Đã thuê</SelectItem>
                  <SelectItem value="maintenance">Bảo trì</SelectItem>
                  <SelectItem value="reserved">Đã đặt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : "Lưu"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Hủy
        </Button>
      </div>
    </form>
  );
};
