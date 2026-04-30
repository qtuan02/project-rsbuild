import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const buildingSchema = z.object({
  name: z.string().min(2, "Tên tòa nhà phải có ít nhất 2 ký tự"),
  address: z.string().min(5, "Địa chỉ phải có ít nhất 5 ký tự"),
  totalFloors: z.string().min(1, "Ít nhất 1 tầng"),
  utilityCycleDay: z.string().min(1, "Ngày từ 1 đến 31"),
  note: z.string().optional(),
});

type BuildingFormValues = z.infer<typeof buildingSchema>;

interface BuildingFormDialogProps {
  onClose: () => void;
}

export const BuildingFormDialog = ({ onClose }: BuildingFormDialogProps) => {
  const form = useForm<BuildingFormValues>({
    resolver: zodResolver(buildingSchema),
    defaultValues: {
      totalFloors: "1",
      utilityCycleDay: "1",
    },
  });

  const onSubmit = (data: BuildingFormValues) => {
    const payload = {
      ...data,
      totalFloors: Number.parseInt(data.totalFloors, 10),
      utilityCycleDay: Number.parseInt(data.utilityCycleDay, 10),
    };
    console.log(payload);
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm tòa nhà mới</DialogTitle>
          <DialogDescription>
            Tạo tòa nhà hoặc khu trọ mới để quản lý.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên tòa nhà</FormLabel>
                    <FormControl>
                      <Input placeholder="VD: Trọ Sinh Viên" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập địa chỉ đầy đủ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="totalFloors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số tầng</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="utilityCycleDay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ngày chốt điện nước</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" max="31" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ghi chú (Tùy chọn)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Thêm ghi chú nếu có" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Hủy
              </Button>
              <Button type="submit">Lưu lại</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
