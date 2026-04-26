import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { routes } from "@/config/routes";
import { useAuthStore } from "@/stores/auth.store";

const registerSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  role: z.enum(["admin", "manager", "tenant"]),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "admin",
    },
  });

  const roleValue = useWatch({ control: form.control, name: "role" });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    // Giả lập API call
    setTimeout(() => {
      login({
        id: "2",
        name: data.name,
        email: data.email,
        role: data.role,
      });
      setIsLoading(false);
      // Nếu là admin (chủ nhà), chuyển sang onboarding
      if (data.role === "admin") {
        navigate(routes.onboarding);
      } else {
        navigate(routes.home);
      }
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Đăng ký tài khoản</CardTitle>
        <CardDescription>Tạo tài khoản mới để sử dụng hệ thống</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="nguyenvana@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={() => (
                <FormItem className="space-y-3">
                  <FormLabel>Vai trò của bạn</FormLabel>
                  <RadioGroup
                    value={roleValue}
                    onValueChange={(val) =>
                      form.setValue(
                        "role",
                        val as "admin" | "manager" | "tenant",
                      )
                    }
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2 rounded-lg border p-3">
                      <RadioGroupItem value="admin" id="r-admin" />
                      <FormLabel
                        htmlFor="r-admin"
                        className="flex-1 cursor-pointer"
                      >
                        Chủ nhà
                        <p className="text-xs font-normal text-muted-foreground">
                          Quản lý toàn bộ hệ thống
                        </p>
                      </FormLabel>
                    </div>
                    <div className="flex items-center space-x-2 rounded-lg border p-3">
                      <RadioGroupItem value="manager" id="r-manager" />
                      <FormLabel
                        htmlFor="r-manager"
                        className="flex-1 cursor-pointer"
                      >
                        Quản lý
                        <p className="text-xs font-normal text-muted-foreground">
                          Được chủ nhà cấp quyền
                        </p>
                      </FormLabel>
                    </div>
                    <div className="flex items-center space-x-2 rounded-lg border p-3">
                      <RadioGroupItem value="tenant" id="r-tenant" />
                      <FormLabel
                        htmlFor="r-tenant"
                        className="flex-1 cursor-pointer"
                      >
                        Khách thuê
                        <p className="text-xs font-normal text-muted-foreground">
                          Xem hóa đơn, hợp đồng
                        </p>
                      </FormLabel>
                    </div>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Đang đăng ký..." : "Đăng ký"}
            </Button>
            <div className="text-center text-sm">
              Đã có tài khoản?{" "}
              <Link
                to={routes.authLogin}
                className="font-medium text-primary hover:underline"
              >
                Đăng nhập
              </Link>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
