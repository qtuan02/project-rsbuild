import { zodResolver } from "@hookform/resolvers/zod";
import { ScanLine, Upload, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
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
  DialogTrigger,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const addTenantSchema = z.object({
  fullName: z.string().min(2, "Họ tên tối thiểu 2 ký tự"),
  idCard: z.string().min(9, "CCCD không hợp lệ"),
  dob: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
});

type AddTenantValues = z.infer<typeof addTenantSchema>;

export const AddTenantDialog = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const form = useForm<AddTenantValues>({
    resolver: zodResolver(addTenantSchema),
    defaultValues: {
      fullName: "",
      idCard: "",
      dob: "",
      address: "",
      phone: "",
    },
  });

  const handleScan = () => {
    setIsScanning(true);
    // Simulate OCR scanning delay
    setTimeout(() => {
      setIsScanning(false);
      setScanSuccess(true);
      form.reset({
        fullName: "NGUYỄN VĂN A",
        idCard: "012345678912",
        dob: "01/01/1990",
        address: "Quận 1, TP. Hồ Chí Minh",
        phone: "",
      });
    }, 2000);
  };

  const resetForm = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setTimeout(() => {
        setIsScanning(false);
        setScanSuccess(false);
        form.reset({
          fullName: "",
          idCard: "",
          dob: "",
          address: "",
          phone: "",
        });
      }, 300);
    }
  };

  const onSubmit = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={resetForm}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Thêm khách thuê mới</DialogTitle>
          <DialogDescription>
            Điền thông tin khách thuê hoặc quét Căn cước công dân (CCCD) để nhập
            tự động.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs defaultValue="scan" className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="scan">Quét CCCD (OCR)</TabsTrigger>
                <TabsTrigger value="manual">Nhập thủ công</TabsTrigger>
              </TabsList>

              <TabsContent value="scan" className="space-y-4 pt-4">
                {!scanSuccess ? (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center bg-muted/50">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      {isScanning ? (
                        <Loader2 className="h-6 w-6 text-primary animate-spin" />
                      ) : (
                        <ScanLine className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <h3 className="mb-1 font-semibold">
                      {isScanning
                        ? "Đang xử lý hình ảnh..."
                        : "Tải lên ảnh CCCD mặt trước"}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Hệ thống AI sẽ tự động trích xuất thông tin từ ảnh.
                    </p>
                    <Button onClick={handleScan} disabled={isScanning}>
                      <Upload className="mr-2 h-4 w-4" />
                      Chọn ảnh (Giả lập)
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-900">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="text-sm font-medium">
                        Trích xuất thành công! Vui lòng kiểm tra lại thông tin.
                      </span>
                    </div>
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Họ và tên</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <FormField
                          control={form.control}
                          name="idCard"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Số CCCD</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="dob"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ngày sinh</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quê quán</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="manual" className="space-y-4 pt-4">
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Họ và tên</FormLabel>
                        <FormControl>
                          <Input placeholder="Nguyễn Văn A" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Số điện thoại</FormLabel>
                          <FormControl>
                            <Input placeholder="0901234567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="idCard"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Số CCCD</FormLabel>
                          <FormControl>
                            <Input placeholder="012345678912" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Hủy
              </Button>
              <Button type="submit">Lưu thông tin</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
