import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { ComplianceItem } from "../data/compliance.mock";

interface ResidenceChecklistCardProps {
  items: ComplianceItem[];
}

export const ResidenceChecklistCard = ({
  items,
}: ResidenceChecklistCardProps) => {
  const getStatusBadge = (status: ComplianceItem["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="gap-1 bg-green-100 text-green-800">
            <CheckCircle2 className="h-3 w-3" />
            Hoàn thành
          </Badge>
        );
      case "pending":
        return (
          <Badge className="gap-1 bg-blue-100 text-blue-800">
            <Clock className="h-3 w-3" />
            Chờ xử lý
          </Badge>
        );
      case "overdue":
        return (
          <Badge className="gap-1 bg-red-100 text-red-800">
            <AlertCircle className="h-3 w-3" />
            Quá hạn
          </Badge>
        );
    }
  };

  const getTypeLabel = (type: ComplianceItem["type"]) => {
    switch (type) {
      case "residence_declaration":
        return "Khai báo nơi ở";
      case "safety_inspection":
        return "Kiểm tra an toàn";
      case "documentation":
        return "Tài liệu";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Danh sách tuân thủ theo khách
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{item.tenant}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.room}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {getTypeLabel(item.type)}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  {getStatusBadge(item.status)}
                  <p className="text-xs text-muted-foreground mt-2">
                    {item.status === "completed"
                      ? `Hoàn thành: ${item.completedDate}`
                      : `Hạn: ${item.dueDate}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
