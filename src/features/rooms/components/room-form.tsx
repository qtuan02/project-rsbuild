import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { Room, RoomStatus, RoomType } from "@/types/room";

import { roomTypeConfig } from "../domain/room-display-config";

interface RoomFormProps {
  room?: Room;
  onSubmit: (data: Partial<Room>) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const roomFormSchema = z.object({
  buildingId: z.string().min(1, "Vui lòng chọn tòa nhà"),
  name: z.string().min(1, "Tên phòng là bắt buộc"),
  floor: z.string().min(1, "Tầng phải lớn hơn hoặc bằng 1"),
  area: z.string().min(1, "Diện tích phải lớn hơn 0"),
  price: z.string().min(1, "Giá thuê không hợp lệ"),
  status: z.enum(["available", "occupied", "maintenance", "reserved"]),
  type: z.enum(["single", "double", "studio", "suite"]),
  electricity: z.boolean(),
  water: z.boolean(),
  trash: z.boolean(),
  internet: z.boolean(),
  parking: z.boolean(),
});

type RoomFormValues = z.infer<typeof roomFormSchema>;

export const RoomForm = ({
  room,
  onSubmit,
  onCancel,
  isLoading = false,
}: RoomFormProps) => {
  const form = useForm<RoomFormValues>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      buildingId: room?.buildingId ?? "",
      name: room?.name ?? "",
      floor: String(room?.floor ?? 1),
      area: String(room?.area ?? 20),
      price: String(room?.price ?? 2500000),
      status: room?.status ?? ("available" as RoomStatus),
      type: room?.type ?? ("single" as RoomType),
      electricity: true,
      water: true,
      trash: true,
      internet: true,
      parking: false,
    },
  });

  const handleSubmit = (values: RoomFormValues) => {
    const payload: Partial<Room> = {
      ...(room ?? {
        buildingId: "",
        name: "",
        floor: 1,
        area: 20,
        price: 2500000,
        status: "available" as RoomStatus,
        type: "single" as RoomType,
        tenant: null,
      }),
      buildingId: values.buildingId,
      name: values.name,
      floor: Number.parseInt(values.floor, 10),
      area: Number.parseInt(values.area, 10),
      price: Number.parseInt(values.price, 10),
      status: values.status,
      type: values.type,
    };

    onSubmit(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Thông tin cơ bản</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="buildingId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tòa nhà</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn tòa nhà" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="b1">Trọ Sinh Viên Xanh</SelectItem>
                        <SelectItem value="b2">
                          Căn hộ Dịch Vụ Cao Cấp
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên phòng</FormLabel>
                    <FormControl>
                      <Input placeholder="VD: Phòng 101" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="floor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tầng</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại phòng</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(roomTypeConfig).map(([key, config]) => (
                          <SelectItem key={key} value={key}>
                            {config.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diện tích (m²)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá thuê/tháng</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trạng thái</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="available">Trống</SelectItem>
                        <SelectItem value="occupied">Đã thuê</SelectItem>
                        <SelectItem value="maintenance">Bảo trì</SelectItem>
                        <SelectItem value="reserved">Đã đặt</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Cấu hình dịch vụ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["electricity", "Điện", "Theo đồng hồ"],
                ["water", "Nước sinh hoạt", "Tính theo m³ hoặc đầu người"],
                ["trash", "Rác thải", "Cố định hàng tháng"],
                ["internet", "Internet / WiFi", "Tính theo phòng"],
                ["parking", "Giữ xe", "Tính theo chiếc"],
              ].map(([key, title, description]) => (
                <FormField
                  key={key}
                  control={form.control}
                  name={key as keyof RoomFormValues}
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>{title}</FormLabel>
                        <p className="text-[10px] uppercase text-muted-foreground">
                          {description}
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={Boolean(field.value)}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
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
    </Form>
  );
};
