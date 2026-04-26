import { zodResolver } from "@hookform/resolvers/zod";
import {
  Car,
  CheckCircle2,
  FileBadge,
  Loader2,
  ScanLine,
  Upload,
  User,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { routes } from "@/config/routes";

const tenantCreateSchema = z.object({
  fullName: z.string().min(2, "Họ và tên tối thiểu 2 ký tự"),
  idCard: z.string().min(9, "Số CCCD không hợp lệ"),
  dob: z.string().min(1, "Vui lòng nhập ngày sinh"),
  hometown: z.string().min(2, "Vui lòng nhập quê quán"),
  phone: z.string().min(9, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ"),
  vehicleType: z.string().optional(),
  vehiclePlate: z.string().optional(),
});

type TenantCreateValues = z.infer<typeof tenantCreateSchema>;

export const TenantCreatePage = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);

  const form = useForm<TenantCreateValues>({
    resolver: zodResolver(tenantCreateSchema),
    defaultValues: {
      fullName: "",
      idCard: "",
      dob: "",
      hometown: "",
      phone: "",
      email: "",
      vehicleType: "",
      vehiclePlate: "",
    },
  });

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanSuccess(true);
      form.reset({
        ...form.getValues(),
        fullName: "NGUYỄN VĂN A",
        idCard: "012345678912",
        dob: "01/01/1990",
        hometown: "Quận 1, TP. Hồ Chí Minh",
      });
    }, 2000);
  };

  const onSubmit = () => {
    navigate(routes.tenants);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Thêm khách thuê mới
          </h2>
          <p className="text-muted-foreground">
            Nhập thông tin chi tiết hồ sơ khách thuê
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate(routes.tenants)}>
          Hủy
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileBadge className="h-5 w-5 text-primary" />
                Định danh (CCCD)
              </CardTitle>
              <CardDescription>
                Sử dụng OCR để trích xuất thông tin nhanh chóng
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!scanSuccess ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center bg-muted/30">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    {isScanning ? (
                      <Loader2 className="h-6 w-6 text-primary animate-spin" />
                    ) : (
                      <ScanLine className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <h3 className="mb-1 font-semibold">
                    Tải lên ảnh CCCD mặt trước
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Hệ thống sẽ tự động điền các thông tin cơ bản.
                  </p>
                  <Button
                    type="button"
                    onClick={handleScan}
                    disabled={isScanning}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {isScanning ? "Đang quét..." : "Quét CCCD"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      Trích xuất thành công! Vui lòng kiểm tra lại.
                    </span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
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
                    <FormField
                      control={form.control}
                      name="hometown"
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Thông tin liên lạc
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input placeholder="0905 xxx xxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                Phương tiện
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="vehicleType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại xe</FormLabel>
                    <FormControl>
                      <Input placeholder="VD: Honda Vision" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vehiclePlate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biển số xe</FormLabel>
                    <FormControl>
                      <Input placeholder="43-X1 123.45" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              type="button"
              onClick={() => navigate(routes.tenants)}
            >
              Hủy bỏ
            </Button>
            <Button type="submit">Lưu hồ sơ khách thuê</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
