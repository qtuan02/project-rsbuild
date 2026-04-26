import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import {
  ContractLifecycleStepper,
  type Step,
} from "@/features/contracts/components/contract-lifecycle-stepper";

const onboardingSchema = z.object({
  buildingName: z.string().min(2, "Tên khu trọ tối thiểu 2 ký tự"),
  address: z.string().min(5, "Địa chỉ tối thiểu 5 ký tự"),
  floors: z.string().min(1, "Vui lòng nhập số tầng"),
  rooms: z.string().min(1, "Vui lòng nhập số phòng"),
  roomNamingRule: z.string().min(1, "Vui lòng nhập quy tắc đặt tên"),
  defaultRent: z.string().min(1, "Vui lòng nhập giá thuê"),
  managerEmail: z.string().email("Email không hợp lệ").or(z.literal("")),
});

type OnboardingFormValues = z.infer<typeof onboardingSchema>;

export const OnboardingWizardPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      buildingName: "",
      address: "",
      floors: "1",
      rooms: "10",
      roomNamingRule: "Phòng {tầng}0{số}",
      defaultRent: "",
      managerEmail: "",
    },
  });

  const steps: Step[] = [
    {
      id: "building",
      title: "Tạo tòa nhà đầu tiên",
      description: "Nhập thông tin cơ bản về khu trọ của bạn.",
      completed: currentStep > 0,
      active: currentStep === 0,
    },
    {
      id: "room",
      title: "Thêm phòng",
      description: "Tạo danh sách các phòng trong khu trọ.",
      completed: currentStep > 1,
      active: currentStep === 1,
    },
    {
      id: "manager",
      title: "Mời quản lý",
      description: "Ủy quyền quản lý cho người khác (tùy chọn).",
      completed: currentStep > 2,
      active: currentStep === 2,
    },
  ];

  const handleNext = async () => {
    if (currentStep === 0) {
      const valid = await form.trigger([
        "buildingName",
        "address",
        "floors",
        "rooms",
      ]);
      if (!valid) return;
    }
    if (currentStep === 1) {
      const valid = await form.trigger(["roomNamingRule", "defaultRent"]);
      if (!valid) return;
    }
    if (currentStep === 2) {
      const valid = await form.trigger(["managerEmail"]);
      if (!valid) return;
    }

    if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    navigate(routes.home);
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-muted/40 p-4 md:p-8">
      <div className="w-full max-w-4xl grid gap-8 md:grid-cols-[300px_1fr]">
        <div>
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Chào mừng!</h1>
            <p className="text-muted-foreground mt-2">
              Hãy thiết lập những thông tin cơ bản để bắt đầu sử dụng hệ thống.
            </p>
          </div>
          <ContractLifecycleStepper steps={steps} />
        </div>

        <Form {...form}>
          <form>
            {currentStep === 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Tòa nhà của bạn</CardTitle>
                  <CardDescription>
                    Thông tin tòa nhà hoặc khu trọ đầu tiên. Bạn có thể thêm
                    nhiều hơn sau này.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="buildingName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên khu trọ</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="VD: Trọ Sinh Viên..."
                            {...field}
                          />
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
                      name="floors"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Số tầng</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="rooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dự kiến số phòng</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="10" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Thêm phòng nhanh</CardTitle>
                  <CardDescription>
                    Hệ thống có thể tự động tạo danh sách phòng dựa trên thiết
                    lập của bạn.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="roomNamingRule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quy tắc đặt tên phòng</FormLabel>
                        <FormControl>
                          <Input placeholder="Phòng {tầng}0{số}" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    VD: Tầng 1 có 5 phòng = Phòng 101, Phòng 102...
                  </p>
                  <FormField
                    control={form.control}
                    name="defaultRent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giá thuê mặc định</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="3,000,000"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Mời quản lý</CardTitle>
                  <CardDescription>
                    Bạn có muốn ai đó cùng quản lý khu trọ này không?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="managerEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email người quản lý (tùy chọn)</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="manager@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <p className="text-sm text-muted-foreground">
                    Họ sẽ nhận được một email mời tham gia quản lý khu trọ của
                    bạn.
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="mt-6 flex justify-between">
              <Button variant="ghost" onClick={handleFinish}>
                Bỏ qua
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep((p) => Math.max(0, p - 1))}
                  disabled={currentStep === 0}
                >
                  Quay lại
                </Button>
                <Button onClick={handleNext}>
                  {currentStep === 2 ? "Hoàn thành" : "Tiếp tục"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
