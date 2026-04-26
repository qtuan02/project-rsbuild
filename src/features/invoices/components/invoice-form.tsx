import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
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
import { Separator } from "@/components/ui/separator";
import { getTenants } from "@/features/tenants/data/tenant.repository";
import type { Invoice, InvoiceStatus } from "@/types/invoice";

interface InvoiceFormProps {
  invoice?: Invoice;
  onSubmit: (data: Partial<Invoice>) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const invoiceFormSchema = z
  .object({
    invoiceNumber: z.string().min(1, "Số hóa đơn là bắt buộc"),
    tenant: z.string().min(1, "Vui lòng chọn khách thuê"),
    room: z.string().min(1),
    floor: z.string().min(1),
    amount: z.string().min(1, "Số tiền không hợp lệ"),
    month: z.string().min(1, "Vui lòng nhập kỳ hóa đơn"),
    dueDate: z.string().min(1, "Vui lòng chọn hạn thanh toán"),
    status: z.enum(["paid", "pending", "overdue", "cancelled"]),
    paymentDate: z.string().nullable(),
  })
  .superRefine((value, ctx) => {
    if (value.status === "paid" && !value.paymentDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["paymentDate"],
        message: "Vui lòng nhập ngày thanh toán khi hóa đơn đã thanh toán",
      });
    }
  });

type InvoiceFormValues = z.infer<typeof invoiceFormSchema>;

export const InvoiceForm = ({
  invoice,
  onSubmit,
  onCancel,
  isLoading = false,
}: InvoiceFormProps) => {
  const tenants = getTenants();
  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      invoiceNumber: invoice?.invoiceNumber ?? "",
      tenant: invoice?.tenant ?? "",
      room: invoice?.room ?? "",
      floor: String(invoice?.floor ?? 0),
      amount: String(invoice?.amount ?? 0),
      month:
        invoice?.month ??
        new Date().toLocaleDateString("vi-VN", {
          month: "2-digit",
          year: "numeric",
        }),
      dueDate: invoice?.dueDate ?? "",
      status: invoice?.status ?? ("pending" as InvoiceStatus),
      paymentDate: invoice?.paymentDate ?? null,
    },
  });

  const selectedTenantName = useWatch({
    control: form.control,
    name: "tenant",
  });
  const selectedStatus = useWatch({ control: form.control, name: "status" });
  const selectedTenant = tenants.find((t) => t.name === selectedTenantName);

  const handleTenantChange = (tenantName: string) => {
    const tenant = tenants.find((t) => t.name === tenantName);
    form.setValue("tenant", tenantName);
    form.setValue("room", tenant?.room ?? "");
    form.setValue("floor", String(tenant?.floor ?? 0));
    form.setValue("amount", String(tenant?.rentAmount ?? 0));
  };

  const handleSubmit = (values: InvoiceFormValues) => {
    onSubmit({
      ...(invoice ?? {}),
      ...values,
      floor: Number.parseInt(values.floor, 10),
      amount: Number.parseInt(values.amount, 10),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Thông tin hóa đơn</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="invoiceNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số hóa đơn</FormLabel>
                    <FormControl>
                      <Input placeholder="VD: HÓ001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tháng thanh toán</FormLabel>
                    <FormControl>
                      <Input placeholder="VD: 04/2026" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tenant"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Khách thuê</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={handleTenantChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn khách thuê..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tenants.map((tenant) => (
                          <SelectItem key={tenant.id} value={tenant.name}>
                            {tenant.name} - {tenant.room}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {selectedTenant && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Thông tin phòng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Phòng
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {selectedTenant.room}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Tầng
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    Tầng {selectedTenant.floor}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Chi tiết thanh toán</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số tiền</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hạn thanh toán</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
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
                        <SelectItem value="pending">Chờ thanh toán</SelectItem>
                        <SelectItem value="paid">Đã thanh toán</SelectItem>
                        <SelectItem value="overdue">Quá hạn</SelectItem>
                        <SelectItem value="cancelled">Đã hủy</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {selectedStatus === "paid" && (
                <FormField
                  control={form.control}
                  name="paymentDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ngày thanh toán</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(e.target.value || null)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
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
