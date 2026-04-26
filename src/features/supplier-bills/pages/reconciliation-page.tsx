import { ArrowDown, ArrowUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/utils/currency";

const reconciliationData = [
  {
    item: "Tiền điện",
    thu: 18500000,
    chi: 15200000,
    diff: 3300000,
    status: "gain",
  },
  {
    item: "Tiền nước",
    thu: 2800000,
    chi: 2400000,
    diff: 400000,
    status: "gain",
  },
  {
    item: "Rác thải",
    thu: 1200000,
    chi: 1000000,
    diff: 200000,
    status: "gain",
  },
  { item: "Internet", thu: 750000, chi: 880000, diff: -130000, status: "loss" },
];

export const ReconciliationPage = () => {
  const totalGain = reconciliationData.reduce(
    (acc, curr) => acc + curr.diff,
    0,
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Đối soát chi phí</h2>
        <p className="text-muted-foreground">
          So sánh giữa số tiền thu từ khách và chi trả cho nhà cung cấp
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tổng thu dịch vụ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(23250000)}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tổng chi dịch vụ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(19480000)}</div>
          </CardContent>
        </Card>
        <Card
          className={`border-l-4 ${totalGain >= 0 ? "border-l-blue-500" : "border-l-orange-500"}`}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Chênh lệch (Lợi nhuận)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalGain)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tỷ suất lợi nhuận
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16.2%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bảng đối soát chi tiết</CardTitle>
          <CardDescription>
            Dữ liệu tổng hợp từ hóa đơn khách thuê và hóa đơn nhà cung cấp
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hạng mục</TableHead>
                <TableHead>Thu từ khách thuê</TableHead>
                <TableHead>Chi cho NCC</TableHead>
                <TableHead className="text-right">Chênh lệch</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reconciliationData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{data.item}</TableCell>
                  <TableCell className="text-emerald-600 font-medium">
                    {formatCurrency(data.thu)}
                  </TableCell>
                  <TableCell className="text-red-600 font-medium">
                    {formatCurrency(data.chi)}
                  </TableCell>
                  <TableCell
                    className={`text-right font-bold ${data.status === "gain" ? "text-emerald-600" : "text-red-600"}`}
                  >
                    <div className="flex items-center justify-end gap-1">
                      {data.status === "gain" ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      )}
                      {formatCurrency(Math.abs(data.diff))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
