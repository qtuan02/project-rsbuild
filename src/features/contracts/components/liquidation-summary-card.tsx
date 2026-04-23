import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/currency";

export interface LiquidationSummary {
  depositAmount: number;
  outstandingFees: number;
  refundAmount: number;
  penaltyAmount: number;
}

interface LiquidationSummaryCardProps {
  summary: LiquidationSummary;
}

export const LiquidationSummaryCard = ({
  summary,
}: LiquidationSummaryCardProps) => {
  const finalBalance =
    summary.depositAmount - summary.outstandingFees - summary.penaltyAmount;

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="text-base">Tóm tắt thanh toán</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Deposit */}
        <div className="flex items-center justify-between rounded-lg bg-white p-3">
          <div>
            <p className="text-sm text-muted-foreground">Tiền đặt cọc</p>
          </div>
          <p className="text-lg font-semibold text-green-600">
            {formatCurrency(summary.depositAmount)}
          </p>
        </div>

        {/* Outstanding Fees */}
        {summary.outstandingFees > 0 && (
          <div className="flex items-center justify-between rounded-lg bg-white p-3">
            <div>
              <p className="text-sm text-muted-foreground">
                Công nợ chưa thanh toán
              </p>
            </div>
            <p className="text-lg font-semibold text-red-600">
              -{formatCurrency(summary.outstandingFees)}
            </p>
          </div>
        )}

        {/* Penalty */}
        {summary.penaltyAmount > 0 && (
          <div className="flex items-center justify-between rounded-lg bg-white p-3">
            <div>
              <p className="text-sm text-muted-foreground">Phí vi phạm</p>
            </div>
            <p className="text-lg font-semibold text-red-600">
              -{formatCurrency(summary.penaltyAmount)}
            </p>
          </div>
        )}

        {/* Final Balance */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-blue-100 to-blue-50 p-3">
            <div>
              <p className="text-sm font-medium">Hoàn lại cho khách</p>
            </div>
            <div className="text-right">
              <p
                className={`text-xl font-bold ${
                  finalBalance > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {finalBalance > 0 ? "+" : ""}
                {formatCurrency(finalBalance)}
              </p>
              <Badge
                variant="outline"
                className={
                  finalBalance > 0
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }
              >
                {finalBalance > 0 ? "Phải hoàn lại" : "Còn nợ"}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
