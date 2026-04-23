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
import { Separator } from "@/components/ui/separator";
import { getTenants } from "@/features/tenants";
import type { Invoice, InvoiceStatus } from "@/types/invoice";

interface InvoiceFormProps {
  invoice?: Invoice;
  onSubmit: (data: Partial<Invoice>) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export const InvoiceForm = ({
  invoice,
  onSubmit,
  onCancel,
  isLoading = false,
}: InvoiceFormProps) => {
  const tenants = getTenants();
  const [formData, setFormData] = useState<Partial<Invoice>>(
    invoice ?? {
      invoiceNumber: "",
      tenant: "",
      room: "",
      floor: 0,
      amount: 0,
      month: new Date().toLocaleDateString("vi-VN", {
        month: "2-digit",
        year: "numeric",
      }),
      dueDate: "",
      status: "pending" as InvoiceStatus,
      paymentDate: null,
    },
  );

  const selectedTenant = tenants.find((t) => t.name === formData.tenant);

  const handleTenantChange = (tenantName: string) => {
    const tenant = tenants.find((t) => t.name === tenantName);
    setFormData((prev) => ({
      ...prev,
      tenant: tenantName,
      room: tenant?.room ?? "",
      floor: tenant?.floor ?? 0,
      amount: tenant?.rentAmount ?? 0,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Thông tin hóa đơn</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">Số hóa đơn</Label>
              <Input
                id="invoiceNumber"
                placeholder="VD: HÓ001"
                value={formData.invoiceNumber ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    invoiceNumber: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="month">Tháng thanh toán</Label>
              <Input
                id="month"
                placeholder="VD: 04/2026"
                value={formData.month ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, month: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="tenant">Khách thuê</Label>
              <Select
                value={formData.tenant ?? ""}
                onValueChange={handleTenantChange}
              >
                <SelectTrigger id="tenant">
                  <SelectValue placeholder="Chọn khách thuê..." />
                </SelectTrigger>
                <SelectContent>
                  {tenants.map((tenant) => (
                    <SelectItem key={tenant.id} value={tenant.name}>
                      {tenant.name} - {tenant.room}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
          <div className="space-y-2">
            <Label htmlFor="amount">Số tiền</Label>
            <Input
              id="amount"
              type="number"
              min="0"
              value={formData.amount ?? 0}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  amount: parseInt(e.target.value),
                }))
              }
            />
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Hạn thanh toán</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Select
                value={formData.status ?? "pending"}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: value as InvoiceStatus,
                  }))
                }
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Chờ thanh toán</SelectItem>
                  <SelectItem value="paid">Đã thanh toán</SelectItem>
                  <SelectItem value="overdue">Quá hạn</SelectItem>
                  <SelectItem value="cancelled">Đã hủy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.status === "paid" && (
              <div className="space-y-2">
                <Label htmlFor="paymentDate">Ngày thanh toán</Label>
                <Input
                  id="paymentDate"
                  type="date"
                  value={formData.paymentDate ?? ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      paymentDate: e.target.value || null,
                    }))
                  }
                />
              </div>
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
  );
};
