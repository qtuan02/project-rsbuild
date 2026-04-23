import {
  Edit,
  Download,
  Trash2,
  Phone,
  Mail,
  DoorOpen,
  Calendar,
  CreditCard,
  FileText,
} from "lucide-react";

import { TenantStatusBadge } from "@/components/shared/badges/tenant-status-badge";
import { InfoCard, InfoRow } from "@/components/shared/cards/info-card";
import { ConfirmActionDialog } from "@/components/shared/dialogs/confirm-action-dialog";
import { PageBackButton } from "@/components/shared/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/cn";
import { formatCurrency } from "@/utils/currency";
import { getInitials } from "@/utils/string";

import { useTenantDetail } from "../hooks/use-tenant-detail";

interface TenantDetailPageProps {
  tenantId: string;
  onBack?: () => void;
}

export const TenantDetailPage = ({
  tenantId,
  onBack,
}: TenantDetailPageProps) => {
  const {
    tenant,
    deleteDialogOpen,
    isDeleting,
    setDeleteDialogOpen,
    handleDelete,
  } = useTenantDetail({ tenantId, onBack });

  if (!tenant) {
    return (
      <div className="space-y-6">
        <PageBackButton onClick={onBack} />
        <div className="rounded-lg border border-dashed bg-card/50 p-12 text-center">
          <h3 className="text-base font-semibold">Không tìm thấy khách thuê</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Khách thuê bạn tìm kiếm không tồn tại.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageBackButton onClick={onBack} />
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            In hồ sơ
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
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white shadow-md",
                      tenant.avatarColor,
                    )}
                  >
                    {getInitials(tenant.name)}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{tenant.name}</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {tenant.gender === "male" ? "Nam" : "Nữ"}
                    </p>
                  </div>
                </div>
                <TenantStatusBadge status={tenant.status} />
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <DoorOpen className="h-4 w-4 text-muted-foreground" />
                <span>
                  {tenant.room} • Tầng {tenant.floor}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{tenant.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{tenant.email}</span>
              </div>
            </CardContent>
          </Card>

          <InfoCard title="Thông tin cá nhân">
            <InfoRow label="ID khách" value={tenant.id} />
            <InfoRow label="Tên" value={tenant.name} />
            <InfoRow label="Số CCCD/CMND" value={tenant.idNumber} />
            <InfoRow
              label="Giới tính"
              value={tenant.gender === "male" ? "Nam" : "Nữ"}
            />
            <InfoRow label="Điện thoại" value={tenant.phone} />
            <InfoRow label="Email" value={tenant.email} />
          </InfoCard>

          <InfoCard title="Thông tin phòng và hợp đồng">
            <InfoRow label="Phòng" value={tenant.room} highlight />
            <InfoRow label="Tầng" value={`Tầng ${tenant.floor}`} />
            <InfoRow label="Ngày vào" value={tenant.moveInDate} />
            <InfoRow label="Ngày kết thúc HĐ" value={tenant.contractEnd} />
            <Button variant="outline" size="sm" className="w-full mt-3">
              <FileText className="mr-2 h-4 w-4" />
              Xem hợp đồng
            </Button>
          </InfoCard>

          <InfoCard title="Thông tin thanh toán">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Tiền thuê/tháng
                </p>
                <p className="mt-2 text-lg font-bold tabular-nums">
                  {formatCurrency(tenant.rentAmount)}
                </p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Tiền cọc
                </p>
                <p className="mt-2 text-lg font-bold tabular-nums">
                  {formatCurrency(tenant.depositAmount)}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-3">
              Lịch sử thanh toán
            </Button>
          </InfoCard>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Trạng thái hiện tại</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted/50 p-4">
                <TenantStatusBadge
                  status={tenant.status}
                  className="w-full justify-center"
                />
              </div>

              <div className="space-y-2 text-sm">
                <p className="font-medium">Khoá phòng</p>
                <p className="text-muted-foreground">{tenant.room}</p>
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <p className="font-medium">Loại hợp đồng</p>
                <p className="text-muted-foreground">Hợp đồng dài hạn</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Hành động nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full gap-2">
                <CreditCard className="h-4 w-4" />
                Tạo hóa đơn
              </Button>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <FileText className="h-4 w-4" />
                Xem hợp đồng
              </Button>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Calendar className="h-4 w-4" />
                Lịch sử
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Liên hệ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <a href={`tel:${tenant.phone}`}>
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Phone className="h-4 w-4" />
                  Gọi điện
                </Button>
              </a>
              <a href={`mailto:${tenant.email}`}>
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Mail className="h-4 w-4" />
                  Gửi email
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>

      <ConfirmActionDialog
        open={deleteDialogOpen}
        title="Xóa khách thuê"
        description={`Bạn có chắc chắn muốn xóa hồ sơ của "${tenant.name}" không? Hành động này không thể hoàn tác.`}
        actionLabel="Xóa"
        variant="destructive"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialogOpen(false)}
      />
    </div>
  );
};
