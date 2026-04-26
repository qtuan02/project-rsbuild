import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { InfoRow } from "@/components/shared/cards/info-card";
import { PageBackButton } from "@/components/shared/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/utils/currency";

import { useContractRenew } from "../hooks/use-contract-renew";

interface ContractRenewPageProps {
  contractId: string;
  onBack?: () => void;
}

const renewContractSchema = z.object({
  newEndDate: z.string().min(1, "Vui lòng chọn ngày kết thúc mới"),
  newRentAmount: z.string().min(1, "Vui lòng nhập tiền thuê mới"),
  notes: z.string().optional(),
});

type RenewContractValues = z.infer<typeof renewContractSchema>;

export const ContractRenewPage = ({
  contractId,
  onBack,
}: ContractRenewPageProps) => {
  const { contract } = useContractRenew(contractId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const form = useForm<RenewContractValues>({
    resolver: zodResolver(renewContractSchema),
    defaultValues: {
      newEndDate: "",
      newRentAmount: String(contract?.rentAmount ?? 0),
      notes: "",
    },
  });

  const newEndDate = useWatch({ control: form.control, name: "newEndDate" });
  const newRentAmount = Number.parseInt(
    useWatch({ control: form.control, name: "newRentAmount" }) || "0",
    10,
  );

  if (!contract) {
    return (
      <div className="space-y-6">
        <PageBackButton onClick={onBack} />
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

  const handleSubmit = () => {
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
      <PageBackButton onClick={onBack} />

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
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="newEndDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ngày kết thúc mới *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <p className="text-xs text-muted-foreground">
                          Hợp đồng hiện tại sẽ kết thúc vào {contract.endDate}
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newRentAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tiền thuê mới (VND) *</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <p className="text-xs text-muted-foreground">
                          Tiền thuê hiện tại:{" "}
                          {formatCurrency(contract.rentAmount)}
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ghi chú</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Nhập các ghi chú hoặc điều khoản bổ sung..."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {!showConfirm && (
                    <div className="flex gap-3">
                      <Button variant="outline" type="button" onClick={onBack}>
                        Hủy
                      </Button>
                      <Button type="submit">Tiếp tục</Button>
                    </div>
                  )}
                </form>
              </Form>
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
                    <span className="font-medium">{newEndDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tiền thuê mới</span>
                    <span className="font-medium">
                      {formatCurrency(newRentAmount)}
                    </span>
                  </div>
                  <div className="border-t pt-3">
                    <p className="text-xs text-muted-foreground">
                      Thay đổi tiền thuê:{" "}
                      <span
                        className={
                          newRentAmount > contract.rentAmount
                            ? "text-red-600"
                            : "text-green-600"
                        }
                      >
                        {newRentAmount > contract.rentAmount ? "+" : ""}
                        {formatCurrency(newRentAmount - contract.rentAmount)}
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
