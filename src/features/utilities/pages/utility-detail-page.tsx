import { Download, Edit2 } from "lucide-react";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { PageBackButton } from "@/components/shared/navigation";
import { ErrorPanel, LoadingPanel } from "@/components/shared/panels";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { routes } from "@/config/routes";

import { utilityStatusUiConfig } from "../components/utility-ui-config";
import { getUtilityById } from "../data/utility.repository";
import {
  utilityStatusConfig,
  utilityTypeConfig,
} from "../domain/utility-display-config";

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex justify-between py-3 border-b last:border-b-0">
    <span className="text-sm font-medium text-muted-foreground">{label}</span>
    <span className="text-sm font-medium">{value}</span>
  </div>
);

export const UtilityDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { utilityId } = useParams<{ utilityId: string }>();

  const [isLoading, setIsLoading] = React.useState(true);
  const [utility, setUtility] = React.useState(getUtilityById(utilityId || ""));
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoading(true);
      setError(null);
      if (!utilityId) {
        setError("Invalid utility ID");
        return;
      }
      const data = getUtilityById(utilityId);
      if (!data) {
        setError("Utility not found");
        return;
      }
      setUtility(data);
    } catch {
      setError("Error loading utility");
    } finally {
      setIsLoading(false);
    }
  }, [utilityId]);

  if (isLoading) {
    return <LoadingPanel />;
  }

  if (error || !utility) {
    return (
      <ErrorPanel
        title="Không thể tải dữ liệu"
        description={error || "Chỉ số không tìm thấy"}
        action={{
          label: "Quay lại",
          onClick: () => navigate(routes.utilities),
        }}
      />
    );
  }

  const statusConfig = utilityStatusConfig[utility.status];
  const statusUiConfig = utilityStatusUiConfig[utility.status];
  const typeConfig = utilityTypeConfig[utility.type];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <PageBackButton onClick={() => navigate(routes.utilities)} />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {utility.roomName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {utility.month} • {typeConfig.label}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Tải xuống
          </Button>
          <Button size="sm" className="gap-2">
            <Edit2 className="h-4 w-4" />
            Chỉnh sửa
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Reading Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Tóm tắt chỉ số</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              <InfoRow
                label="Chỉ số cũ"
                value={utility.oldIndex.toLocaleString()}
              />
              <InfoRow
                label="Chỉ số mới"
                value={utility.newIndex.toLocaleString()}
              />
              <InfoRow
                label="Tiêu thụ"
                value={utility.consumption.toLocaleString()}
              />
            </div>
          </CardContent>
        </Card>

        {/* Status & Details */}
        <Card>
          <CardHeader>
            <CardTitle>Chi tiết</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              <InfoRow
                label="Loại"
                value={
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200">
                    {typeConfig.label}
                  </span>
                }
              />
              <InfoRow
                label="Trạng thái"
                value={
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusUiConfig.badgeClassName}`}
                  >
                    {statusConfig.label}
                  </span>
                }
              />
              <InfoRow
                label="Cập nhật lần cuối"
                value={new Date(utility.updatedAt).toLocaleString("vi-VN")}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Xem trước thanh toán</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Tiêu thụ:</span>
              <span className="font-medium">
                {utility.consumption}{" "}
                {utility.type === "electricity" ? "kWh" : "m³"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Giá:</span>
              <span className="font-medium">
                {utility.type === "electricity" ? "3,500" : "8,000"} ₫/
                {utility.type === "electricity" ? "kWh" : "m³"}
              </span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
              <span>Tổng cộng:</span>
              <span>
                {(
                  utility.consumption *
                  (utility.type === "electricity" ? 3500 : 8000)
                ).toLocaleString()}{" "}
                ₫
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Proof Images */}
      {utility.proofImages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Hình ảnh chứng minh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {utility.proofImages.map((image, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square overflow-hidden rounded-lg border bg-muted flex items-center justify-center"
                >
                  <img
                    src={image}
                    alt={`Proof ${idx + 1}`}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23f3f4f6' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='14' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'%3EImage Not Found%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* History Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Lịch sử</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <div className="h-12 w-0.5 bg-border" />
              </div>
              <div>
                <p className="font-medium text-sm">Chỉ số được cập nhật</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(utility.updatedAt).toLocaleString("vi-VN")}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="h-3 w-3 rounded-full bg-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-sm">Chỉ số được tạo</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(utility.updatedAt).toLocaleString("vi-VN")}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
