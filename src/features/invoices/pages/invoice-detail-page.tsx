import {
  Edit,
  Download,
  Trash2,
  ArrowLeft,
  CheckCircle2,
  Clock,
  AlertCircle,
  DoorOpen,
  User,
  Calendar,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/cn";
import type { Invoice } from "@/types/invoice";
import { formatCurrency } from "@/utils/currency";

import { InvoiceStatusBadge } from "@/components/shared/badges/invoice-status-badge";
import { InfoCard, InfoRow } from "@/components/shared/cards/info-card";
import { ConfirmActionDialog } from "@/components/shared/dialogs/confirm-action-dialog";

import { getInvoices } from "../data/invoice.repository";
import { invoiceStatusConfig } from "../domain/invoice-display-config";

interface InvoiceDetailPageProps {
  invoiceId: string;
  onBack?: () => void;
}

export const InvoiceDetailPage = ({
  invoiceId,
  onBack,
}: InvoiceDetailPageProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const invoice = getInvoices().find((i) => i.id === invoiceId);

  if (!invoice) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </Button>
        <div className="rounded-lg border border-dashed bg-card/50 p-12 text-center">
          <h3 className="text-base font-semibold">Không tìm thấy hóa đơn</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Hóa đơn bạn tìm kiếm không tồn tại.
          </p>
        </div>
      </div>
    );
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsDeleting(false);
    setDeleteDialogOpen(false);
    onBack?.();
  };

  const statusConfig = invoiceStatusConfig[invoice.status];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Tải PDF
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Edit className="h-4 w-4" />
            Chỉnh sửa
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-destructive hover:text-destructive"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
            Xóa
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{invoice.invoiceNumber}</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Tháng {invoice.month}
                  </p>
                </div>
                <InvoiceStatusBadge status={invoice.status} />
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 p-6 border border-primary/20">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Tổng số tiền
                </p>
                <p className="mt-2 text-4xl font-bold tabular-nums text-foreground">
                  {formatCurrency(invoice.amount)}
                </p>
              </div>
            </CardContent>
          </Card>

          <InfoCard title="Thông tin khách thuê">
            <InfoRow label="Tên khách" value={invoice.tenant} highlight />
            <InfoRow label="Phòng" value={invoice.room} />
            <InfoRow label="Tầng" value={`Tầng ${invoice.floor}`} />
            <Button variant="outline" size="sm" className="w-full mt-3">
              <User className="mr-2 h-4 w-4" />
              Xem hồ sơ khách
            </Button>
          </InfoCard>

          <InfoCard title="Chi tiết hóa đơn">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b">
                <span className="text-sm text-muted-foreground">Tiền thuê phòng</span>
                <span className="text-sm font-medium tabular-nums">
                  {formatCurrency(invoice.amount)}
                </span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b">
                <span className="text-sm text-muted-foreground">Phí dịch vụ</span>
                <span className="text-sm font-medium tabular-nums">
                  {formatCurrency(0)}
                </span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b">
                <span className="text-sm text-muted-foreground">Các khoản khác</span>
                <span className="text-sm font-medium tabular-nums">
                  {formatCurrency(0)}
                </span>
              </div>
              <div className="flex items-center justify-between pt-3">
                <span className="text-sm font-semibold">Tổng cộng</span>
                <span className="text-base font-bold text-foreground tabular-nums">
                  {formatCurrency(invoice.amount)}
                </span>
              </div>
            </div>
          </InfoCard>

          <InfoCard title="Thông tin thanh toán">
            <InfoRow label="Ngày đến hạn" value={invoice.dueDate} />
            {invoice.paymentDate ? (
              <>
                <InfoRow label="Ngày thanh toán" value={invoice.paymentDate} highlight />
                <InfoRow label="Trạng thái" value="Đã thanh toán" />
              </>
            ) : invoice.status === "pending" ? (
              <>
                <InfoRow
                  label="Trạng thái"
                  value={
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      Chờ thanh toán
                    </span>
                  }
                />
              </>
            ) : (
              <>
                <InfoRow
                  label="Trạng thái"
                  value={
                    <span className="text-red-600 dark:text-red-400 font-medium">
                      Quá hạn
                    </span>
                  }
                />
              </>
            )}
            <Button variant="outline" size="sm" className="w-full mt-3">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Đánh dấu đã thanh toán
            </Button>
          </InfoCard>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Trạng thái thanh toán</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted/50 p-4">
                <InvoiceStatusBadge status={invoice.status} className="w-full justify-center" />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Hạn: {invoice.dueDate}</span>
                </div>
                {invoice.paymentDate && (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Thanh toán: {invoice.paymentDate}</span>
                  </div>
                )}
              </div>

              <Separator />

              <Button variant="outline" size="sm" className="w-full gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Xác nhận thanh toán
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tóm tắt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Mã hóa đơn
                </p>
                <p className="mt-1 font-mono text-sm font-semibold">
                  {invoice.invoiceNumber}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Số tiền
                </p>
                <p className="mt-1 text-lg font-bold text-foreground">
                  {formatCurrency(invoice.amount)}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Cập nhật
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {invoice.lastUpdated}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Hành động</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Download className="h-4 w-4" />
                Tải PDF
              </Button>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Edit className="h-4 w-4" />
                In hóa đơn
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <ConfirmActionDialog
        open={deleteDialogOpen}
        title="Xóa hóa đơn"
        description={`Bạn có chắc chắn muốn xóa hóa đơn "${invoice.invoiceNumber}" không? Hành động này không thể hoàn tác.`}
        actionLabel="Xóa"
        variant="destructive"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialogOpen(false)}
      />
    </div>
  );
};
