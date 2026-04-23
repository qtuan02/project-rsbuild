import { AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { InfoRow } from "@/components/shared/cards/info-card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/utils/currency";

import { getContracts } from "../data/contract.repository";

interface ContractRenewPageProps {
  contractId: string;
  onBack?: () => void;
}

export const ContractRenewPage = ({
  contractId,
  onBack,
}: ContractRenewPageProps) => {
  const contract = getContracts().find((c) => c.id === contractId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    newEndDate: "",
    newRentAmount: contract?.rentAmount || 0,
    notes: "",
  });

  if (!contract) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </Button>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Hợp đồng không tìm thấy
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    toast.success("Gia hạn hợp đồng", {
      description: "Đã mô phỏng gia hạn thành công (UI-only).",
    });
    onBack?.();
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Quay lại
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Contract Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Hợp đồng hiện tại</CardTitle>
              <CardDescription>Thông tin chi tiết của hợp đồng</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <InfoRow label="Số hợp đồng" value={contract.contractNumber} />
              <InfoRow label="Khách thuê" value={contract.tenant} />
              <InfoRow label="Phòng" value={contract.room} />
              <InfoRow
                label="Tiền thuê"
                value={formatCurrency(contract.rentAmount)}
              />
              <InfoRow label="Ngày bắt đầu" value={contract.startDate} />
              <InfoRow label="Ngày kết thúc" value={contract.endDate} />
            </CardContent>
          </Card>

          {/* Renewal Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Thông tin gia hạn</CardTitle>
              <CardDescription>
                Nhập thông tin gia hạn hợp đồng mới
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="newEndDate">Ngày kết thúc mới *</Label>
                  <Input
                    id="newEndDate"
                    type="date"
                    value={formData.newEndDate}
                    onChange={(e) =>
                      setFormData({ ...formData, newEndDate: e.target.value })
                    }
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Hợp đồng hiện tại sẽ kết thúc vào {contract.endDate}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newRent">Tiền thuê mới (VND) *</Label>
                  <Input
                    id="newRent"
                    type="number"
                    value={formData.newRentAmount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        newRentAmount: Number(e.target.value),
                      })
                    }
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Tiền thuê hiện tại: {formatCurrency(contract.rentAmount)}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Ghi chú</Label>
                  <Textarea
                    id="notes"
                    placeholder="Nhập các ghi chú hoặc điều khoản bổ sung..."
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    rows={4}
                  />
                </div>

                {!showConfirm && (
                  <div className="flex gap-3">
                    <Button variant="outline" type="button" onClick={onBack}>
                      Hủy
                    </Button>
                    <Button type="submit">Tiếp tục</Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Confirmation Card */}
        {showConfirm && (
          <div className="lg:col-span-1">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-green-900">
                  <CheckCircle2 className="h-5 w-5" />
                  Xác nhận gia hạn
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-green-200 bg-white">
                  <AlertCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription>
                    Vui lòng kiểm tra thông tin trước khi xác nhận
                  </AlertDescription>
                </Alert>

                <div className="space-y-3 rounded-lg bg-white p-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Ngày kết thúc mới
                    </span>
                    <span className="font-medium">{formData.newEndDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tiền thuê mới</span>
                    <span className="font-medium">
                      {formatCurrency(formData.newRentAmount)}
                    </span>
                  </div>
                  <div className="border-t pt-3">
                    <p className="text-xs text-muted-foreground">
                      Thay đổi tiền thuê:{" "}
                      <span
                        className={
                          formData.newRentAmount > contract.rentAmount
                            ? "text-red-600"
                            : "text-green-600"
                        }
                      >
                        {formData.newRentAmount > contract.rentAmount
                          ? "+"
                          : ""}
                        {formatCurrency(
                          formData.newRentAmount - contract.rentAmount,
                        )}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    onClick={handleConfirm}
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? "Đang lưu..." : "Xác nhận gia hạn"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowConfirm(false)}
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    Chỉnh sửa
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
