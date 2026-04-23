import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { ReportData } from "../data/reports.mock";

interface ReportTableProps {
  data: ReportData[];
  title: string;
  description?: string;
}

export const ReportTable = ({ data, title, description }: ReportTableProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getOccupancyBadge = (rate: number) => {
    if (rate >= 90) return "bg-green-100 text-green-800";
    if (rate >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left font-semibold px-4 py-2">Tháng</th>
                <th className="text-left font-semibold px-4 py-2">Tòa/Tầng</th>
                <th className="text-right font-semibold px-4 py-2">
                  Doanh thu
                </th>
                <th className="text-right font-semibold px-4 py-2">Chi phí</th>
                <th className="text-right font-semibold px-4 py-2">
                  Lợi nhuận
                </th>
                <th className="text-center font-semibold px-4 py-2">Lấp đầy</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr
                  key={`${row.month}-${row.building}-${row.floor}`}
                  className="border-b hover:bg-muted/50"
                >
                  <td className="px-4 py-3">{row.month}</td>
                  <td className="px-4 py-3">
                    {row.building} - {row.floor}
                  </td>
                  <td className="px-4 py-3 text-right text-green-600 font-medium">
                    {formatCurrency(row.revenue)}
                  </td>
                  <td className="px-4 py-3 text-right text-red-600 font-medium">
                    {formatCurrency(row.expenses)}
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    {formatCurrency(row.profit)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Badge className={getOccupancyBadge(row.occupancyRate)}>
                      {row.occupancyRate}%
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
