import {
  Edit,
  Download,
  Trash2,
  ArrowLeft,
  User,
  Calendar,
  DoorOpen,
  FileText,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

import type { Contract } from "@/types/contract";
import { formatCurrency } from "@/utils/currency";

import { InfoCard, InfoRow } from "@/components/shared/cards/info-card";
import { ConfirmActionDialog } from "@/components/shared/dialogs/confirm-action-dialog";

import { getContracts } from "../data/contract.repository";
import { contractStatusConfig } from "../domain/contract-display-config";

interface ContractDetailPageProps {
  contractId: string;
  onBack?: () => void;
}

export const ContractDetailPage = ({
  contractId,
  onBack,
}: ContractDetailPageProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const contract = getContracts().find((c) => c.id === contractId);

  if (!contract) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </Button>
        <div className="rounded-lg border border-dashed bg-card/50 p-12 text-center">
          <h3 className="text-base font-semibold">Không tìm thấy hợp đồng</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Hợp đồng bạn tìm kiếm không tồn tại.
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

  const statusConfig = contractStatusConfig[contract.status];

  // Calculate if contract is expiring soon (within 30 days)
  const endDate = new Date(contract.endDate.split("/").reverse().join("-"));
  const today = new Date();
  const daysUntilEnd = Math.floor(
    (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
  const isExpiringsoon = daysUntilEnd <= 30 && daysUntilEnd > 0;

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

      {isExpiringsoon && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Hợp đồng sẽ hết hạn trong {daysUntilEnd} ngày. Vui lòng gia hạn hoặc liên hệ khách
            thuê.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{contract.contractNumber}</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Ký kết: {contract.startDate}
                  </p>
                </div>
                <Badge variant="outline" className={statusConfig.className}>
                  {statusConfig.label}
                </Badge>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Ngày bắt đầu
                  </p>
                  <p className="mt-2 text-base font-semibold">{contract.startDate}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Ngày kết thúc
                  </p>
                  <p className="mt-2 text-base font-semibold">{contract.endDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <InfoCard title="Thông tin khách thuê">
            <InfoRow label="Tên khách" value={contract.tenant} highlight />
            <InfoRow label="Phòng" value={contract.room} />
            <InfoRow label="Tầng" value={`Tầng ${contract.floor}`} />
            <Button variant="outline" size="sm" className="w-full mt-3">
              <User className="mr-2 h-4 w-4" />
              Xem hồ sơ khách
            </Button>
          </InfoCard>

          <InfoCard title="Điều khoản hợp đồng">
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Thời hạn hợp đồng
                </p>
                <p className="mt-1 text-sm font-medium">12 tháng</p>
              </div>
              <Separator />
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Tiền thuê hàng tháng
                </p>
                <p className="mt-1 text-base font-bold text-foreground">
                  {formatCurrency(contract.rentAmount)}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Tiền đặt cọc
                </p>
                <p className="mt-1 text-base font-bold text-foreground">
                  {formatCurrency(contract.depositAmount)}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Loại hợp đồng
                </p>
                <p className="mt-1 text-sm font-medium">Hợp đồng dài hạn</p>
              </div>
            </div>
          </InfoCard>

          <InfoCard title="Thời gian hợp đồng">
            <InfoRow label="Ngày bắt đầu" value={contract.startDate} />
            <InfoRow label="Ngày kết thúc" value={contract.endDate} highlight />
            <InfoRow label="Thời hạn" value="12 tháng" />
            {isExpiringsoon && (
              <InfoRow
                label="Cảnh báo"
                value={<span className="text-red-600 dark:text-red-400">Sắp hết hạn</span>}
              />
            )}
          </InfoCard>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Trạng thái</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted/50 p-4">
                <Badge variant="outline" className={`w-full justify-center ${statusConfig.className}`}>
                  {statusConfig.label}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <p className="font-medium">Khách thuê</p>
                <p className="text-muted-foreground">{contract.tenant}</p>
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <p className="font-medium">Phòng</p>
                <p className="text-muted-foreground">{contract.room}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Thông tin tài chính</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Tiền thuê/tháng
                </p>
                <p className="mt-1 text-lg font-bold text-foreground">
                  {formatCurrency(contract.rentAmount)}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Tiền đặt cọc
                </p>
                <p className="mt-1 text-lg font-bold text-foreground">
                  {formatCurrency(contract.depositAmount)}
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
                <FileText className="h-4 w-4" />
                In hợp đồng
              </Button>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Calendar className="h-4 w-4" />
                Gia hạn
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <ConfirmActionDialog
        open={deleteDialogOpen}
        title="Xóa hợp đồng"
        description={`Bạn có chắc chắn muốn xóa hợp đồng "${contract.contractNumber}" không? Hành động này không thể hoàn tác.`}
        actionLabel="Xóa"
        variant="destructive"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialogOpen(false)}
      />
    </div>
  );
};
