import { InfoCard, InfoRow } from "@/components/shared/cards/info-card";
import { DetailPageShell } from "@/components/shared/layout/detail-page-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/currency";

import { useSupplierBillDetail } from "../hooks/use-supplier-bill-detail";

interface SupplierBillDetailPageProps {
  billId: string;
  onBack?: () => void;
}

export const SupplierBillDetailPage = ({
  billId,
  onBack,
}: SupplierBillDetailPageProps) => {
  const { bill, buildingName } = useSupplierBillDetail(billId);

  if (!bill) {
    return (
      <DetailPageShell onBack={onBack}>
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            Không tìm thấy hóa đơn nhà cung cấp.
          </CardContent>
        </Card>
      </DetailPageShell>
    );
  }

  return (
    <DetailPageShell onBack={onBack}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{bill.supplierName}</CardTitle>
          <Badge variant={bill.paymentDate ? "default" : "secondary"}>
            {bill.paymentDate ? "Đã thanh toán" : "Chờ thanh toán"}
          </Badge>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold tabular-nums">
            {formatCurrency(bill.totalAmount)}
          </p>
        </CardContent>
      </Card>

      <InfoCard title="Thông tin hóa đơn">
        <InfoRow label="Mã hóa đơn" value={bill.id} />
        <InfoRow label="Tòa nhà" value={buildingName} />
        <InfoRow label="Loại dịch vụ" value={bill.type} />
        <InfoRow label="Nhà cung cấp" value={bill.supplierName} />
        <InfoRow label="Kỳ hóa đơn" value={bill.billingPeriod} />
        <InfoRow
          label="Số tiền"
          value={formatCurrency(bill.totalAmount)}
          highlight
        />
        <InfoRow label="Ngày thanh toán" value={bill.paymentDate || "---"} />
      </InfoCard>
    </DetailPageShell>
  );
};
