import { InfoCard, InfoRow } from "@/components/shared/cards/info-card";
import { DetailPageShell } from "@/components/shared/layout/detail-page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/currency";

import { useExpenseDetail } from "../hooks/use-expense-detail";

interface ExpenseDetailPageProps {
  expenseId: string;
  onBack?: () => void;
}

export const ExpenseDetailPage = ({
  expenseId,
  onBack,
}: ExpenseDetailPageProps) => {
  const { expense, buildingName } = useExpenseDetail(expenseId);

  if (!expense) {
    return (
      <DetailPageShell onBack={onBack}>
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            Không tìm thấy khoản chi phí.
          </CardContent>
        </Card>
      </DetailPageShell>
    );
  }

  return (
    <DetailPageShell onBack={onBack}>
      <Card>
        <CardHeader>
          <CardTitle>{expense.category}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold tabular-nums">
            {formatCurrency(expense.amount)}
          </p>
        </CardContent>
      </Card>

      <InfoCard title="Thông tin chi phí">
        <InfoRow label="Mã khoản chi" value={expense.id} />
        <InfoRow label="Tòa nhà" value={buildingName} />
        <InfoRow label="Ngày chi" value={expense.expenseDate} />
        <InfoRow label="Danh mục" value={expense.category} />
        <InfoRow
          label="Số tiền"
          value={formatCurrency(expense.amount)}
          highlight
        />
        <InfoRow label="Mô tả" value={expense.description || "---"} />
      </InfoCard>
    </DetailPageShell>
  );
};
