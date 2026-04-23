import { CheckCircle2, Clock, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { SendLog } from "../data/communications.mock";

interface SendLogTableProps {
  logs: SendLog[];
}

export const SendLogTable = ({ logs }: SendLogTableProps) => {
  const getStatusIcon = (status: SendLog["status"]) => {
    switch (status) {
      case "sent":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: SendLog["status"]) => {
    const classes: Record<SendLog["status"], string> = {
      sent: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
    };

    const labels: Record<SendLog["status"], string> = {
      sent: "Đã gửi",
      failed: "Thất bại",
      pending: "Chờ gửi",
    };

    return (
      <Badge className={classes[status]} variant="secondary">
        {getStatusIcon(status)}
        <span className="ml-1">{labels[status]}</span>
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Lịch sử gửi</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left font-semibold px-4 py-2">Khách</th>
                <th className="text-left font-semibold px-4 py-2">Mẫu</th>
                <th className="text-left font-semibold px-4 py-2">Kênh</th>
                <th className="text-left font-semibold px-4 py-2">
                  Người nhận
                </th>
                <th className="text-center font-semibold px-4 py-2">
                  Trạng thái
                </th>
                <th className="text-left font-semibold px-4 py-2">Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm">{log.tenant}</td>
                  <td className="px-4 py-3 text-sm">{log.template}</td>
                  <td className="px-4 py-3 text-sm capitalize">
                    {log.channel}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {log.recipient}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {getStatusBadge(log.status)}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {log.sentDate}
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
