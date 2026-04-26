import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, ChevronLeft, Save } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { routes } from "@/config/routes";

import { ContractLifecycleStepper } from "../components/contract-lifecycle-stepper";

const contractCreateSchema = z.object({
  buildingId: z.string().min(1, "Vui lòng chọn tòa nhà"),
  room: z.string().min(1, "Vui lòng chọn phòng"),
  tenantName: z.string().min(2, "Vui lòng nhập tên khách"),
  tenantPhone: z.string().min(9, "Số điện thoại không hợp lệ"),
  tenantIdCard: z.string().min(9, "CCCD không hợp lệ"),
  startDate: z.string().min(1, "Vui lòng chọn ngày bắt đầu"),
  termMonths: z.string().min(1, "Vui lòng nhập thời hạn"),
  rentAmount: z.string().min(1, "Vui lòng nhập giá thuê"),
  depositAmount: z.string().min(1, "Vui lòng nhập tiền cọc"),
});

type ContractCreateValues = z.infer<typeof contractCreateSchema>;

export const ContractCreatePage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const form = useForm<ContractCreateValues>({
    resolver: zodResolver(contractCreateSchema),
    defaultValues: {
      buildingId: "b1",
      room: "",
      tenantName: "",
      tenantPhone: "",
      tenantIdCard: "",
      startDate: "",
      termMonths: "6",
      rentAmount: "3000000",
      depositAmount: "3000000",
    },
  });
  const previewRoom = useWatch({ control: form.control, name: "room" });
  const previewTenantName = useWatch({
    control: form.control,
    name: "tenantName",
  });
  const previewTermMonths = useWatch({
    control: form.control,
    name: "termMonths",
  });
  const previewRentAmount = useWatch({
    control: form.control,
    name: "rentAmount",
  });

  const steps = [
    {
      id: "room",
      title: "Chọn phòng",
      completed: step > 0,
      active: step === 0,
    },
    {
      id: "tenant",
      title: "Khách thuê",
      completed: step > 1,
      active: step === 1,
    },
    {
      id: "terms",
      title: "Điều khoản",
      completed: step > 2,
      active: step === 2,
    },
    {
      id: "preview",
      title: "Xác nhận",
      completed: step > 3,
      active: step === 3,
    },
  ];

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));
  const onSubmit = () => navigate(routes.contracts);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Tạo hợp đồng mới</h2>
        <p className="text-muted-foreground">
          Quy trình 4 bước để thiết lập hợp đồng thuê phòng
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Card className="h-fit">
          <CardContent className="pt-6">
            <ContractLifecycleStepper steps={steps} />
          </CardContent>
        </Card>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {step === 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Chọn phòng trống</CardTitle>
                  <CardDescription>
                    Chọn phòng muốn lập hợp đồng
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="buildingId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tòa nhà</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="b1">
                              Trọ Sinh Viên Xanh
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="room"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phòng</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn phòng..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="101">
                              Phòng 101 (Trống)
                            </SelectItem>
                            <SelectItem value="203">
                              Phòng 203 (Trống)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            )}

            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin khách thuê</CardTitle>
                  <CardDescription>
                    Nhập thông tin người đại diện thuê phòng
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="tenantName"
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
                    <FormField
                      control={form.control}
                      name="tenantPhone"
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
                  </div>
                  <FormField
                    control={form.control}
                    name="tenantIdCard"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số CCCD</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập số CCCD" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Điều khoản hợp đồng</CardTitle>
                  <CardDescription>
                    Thời hạn, tiền cọc và các phí dịch vụ
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ngày bắt đầu</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="termMonths"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Thời hạn (tháng)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="rentAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Giá thuê</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="depositAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tiền cọc</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Xác nhận & Hoàn tất</CardTitle>
                  <CardDescription>
                    Kiểm tra lại toàn bộ thông tin trước khi lưu
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border p-4 bg-muted/30">
                    <p className="text-sm">
                      Hợp đồng thuê{" "}
                      <strong>Phòng {previewRoom || "..."}</strong> bởi{" "}
                      <strong>{previewTenantName || "..."}</strong>.
                    </p>
                    <p className="text-sm mt-1">
                      Thời hạn {previewTermMonths || "0"} tháng, giá{" "}
                      {previewRentAmount || "0"}đ/tháng.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={step === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Quay lại
              </Button>
              {step < 3 ? (
                <Button type="button" onClick={nextStep}>
                  Tiếp theo <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" /> Lưu hợp đồng
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
