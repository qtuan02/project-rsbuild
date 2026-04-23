import { AlertTriangle, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { InfoRow } from "@/components/shared/cards/info-card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/currency";

import { ContractLifecycleStepper } from "../components/contract-lifecycle-stepper";
import { LiquidationChecklist } from "../components/liquidation-checklist";
import { LiquidationSummaryCard } from "../components/liquidation-summary-card";
import { getContracts } from "../data/contract.repository";

import type { ChecklistItem } from "../components/liquidation-checklist";

interface ContractLiquidationPageProps {
  contractId: string;
  onBack?: () => void;
}

export const ContractLiquidationPage = ({
  contractId,
  onBack,
}: ContractLiquidationPageProps) => {
  const contract = getContracts().find((c) => c.id === contractId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    {
      id: "asset-check",
      title: "Kiểm tra tài sản",
      description: "Kiểm tra điều kiện phòng, nội thất và trang thiết bị",
      completed: false,
    },
    {
      id: "settle-utilities",
      title: "Thanh toán tiện ích",
      description: "Thanh toán hóa đơn điện nước còn nợ",
      completed: false,
    },
    {
      id: "collect-keys",
      title: "Tập hợp chìa khóa",
      description: "Thu hồi chìa khóa phòng từ khách",
      completed: false,
    },
    {
      id: "final-inspection",
      title: "Kiểm tra cuối cùng",
      description: "Xác nhận trạng thái phòng với khách",
      completed: false,
    },
  ]);

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

  const handleChecklistToggle = (itemId: string) => {
    setChecklistItems(
      checklistItems.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const checklistCompletion =
    (checklistItems.filter((item) => item.completed).length /
      checklistItems.length) *
    100;
  const canProceedToSettlement = checklistCompletion === 100;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    toast.success("Thanh lý hợp đồng", {
      description: "Đã mô phỏng thanh lý thành công (UI-only).",
    });
    onBack?.();
  };

  const steps = [
    {
      id: "check-assets",
      title: "Kiểm tra tài sản",
      description: "Kiểm tra toàn bộ tài sản và điều kiện phòng",
      completed: currentStep > 1,
      active: currentStep === 1,
    },
    {
      id: "settle-fees",
      title: "Thanh toán phí",
      description: "Tính toán và thanh toán các khoản phí",
      completed: currentStep > 2,
      active: currentStep === 2,
    },
    {
      id: "finalize",
      title: "Hoàn tất",
      description: "Xác nhận thanh lý và hoàn trả tiền đặt cọc",
      completed: currentStep > 3,
      active: currentStep === 3,
    },
  ];

  // Mock settlement summary
  const settlementSummary = {
    depositAmount: contract.depositAmount || 2000000,
    outstandingFees: 500000,
    refundAmount: 0,
    penaltyAmount: 300000,
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Quay lại
      </Button>

      {/* Alert */}
      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          Thanh lý hợp đồng là quá trình không thể hoàn tác. Vui lòng kiểm tra
          kỹ thông tin trước khi xác nhận.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sidebar - Stepper */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quy trình thanh lý</CardTitle>
            </CardHeader>
            <CardContent>
              <ContractLifecycleStepper steps={steps} />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contract Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Thông tin hợp đồng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <InfoRow label="Số hợp đồng" value={contract.contractNumber} />
              <InfoRow label="Khách thuê" value={contract.tenant} />
              <InfoRow label="Phòng" value={contract.room} />
              <InfoRow
                label="Tiền đặt cọc"
                value={formatCurrency(contract.depositAmount || 0)}
              />
              <InfoRow label="Ngày kết thúc" value={contract.endDate} />
            </CardContent>
          </Card>

          {/* Step 1: Asset Check */}
          {currentStep === 1 && (
            <>
              <LiquidationChecklist
                items={checklistItems}
                onItemToggle={handleChecklistToggle}
                title="Danh sách kiểm tra tài sản"
              />
              <div className="flex gap-3">
                <Button variant="outline" onClick={onBack}>
                  Hủy
                </Button>
                <Button
                  onClick={() => setCurrentStep(2)}
                  disabled={!canProceedToSettlement}
                >
                  Tiếp tục: Thanh toán phí
                </Button>
              </div>
            </>
          )}

          {/* Step 2: Settlement */}
          {currentStep === 2 && (
            <>
              <LiquidationSummaryCard summary={settlementSummary} />
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Chi tiết thanh toán
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-lg border p-3">
                    <p className="text-sm font-medium mb-3">
                      Công nợ chưa thanh toán
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Tiền nước tháng 03
                        </span>
                        <span>200,000 VND</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Tiền điện tháng 04
                        </span>
                        <span>300,000 VND</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                    <p className="text-sm font-medium mb-3 text-red-900">
                      Phí vi phạm
                    </p>
                    <p className="text-sm text-red-800">
                      Làm hỏng cửa sổ: 300,000 VND
                    </p>
                  </div>
                </CardContent>
              </Card>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Quay lại
                </Button>
                <Button onClick={() => setCurrentStep(3)}>
                  Tiếp tục: Hoàn tất
                </Button>
              </div>
            </>
          )}

          {/* Step 3: Finalize */}
          {currentStep === 3 && (
            <>
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-base text-green-900">
                    Sẵn sàng hoàn tất
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-green-800">
                    Tất cả các bước đã được hoàn thành. Nhấp "Xác nhận thanh lý"
                    để hoàn tất quá trình.
                  </p>
                </CardContent>
              </Card>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                  Quay lại
                </Button>
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Đang xử lý..." : "Xác nhận thanh lý"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
