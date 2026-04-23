import { CheckCircle2, Circle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface ChecklistItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

interface LiquidationChecklistProps {
  items: ChecklistItem[];
  onItemToggle: (itemId: string) => void;
  title?: string;
}

export const LiquidationChecklist = ({
  items,
  onItemToggle,
  title = "Danh sách kiểm tra",
}: LiquidationChecklistProps) => {
  const completedCount = items.filter((item) => item.completed).length;
  const progress = (completedCount / items.length) * 100;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              {completedCount}/{items.length} hoàn thành
            </p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex items-start gap-3 rounded-lg border p-3 transition-colors ${
                item.completed ? "bg-green-50" : "hover:bg-muted/50"
              }`}
            >
              <button
                onClick={() => onItemToggle(item.id)}
                className="mt-0.5 flex-shrink-0"
              >
                {item.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <p
                  className={`font-medium text-sm ${
                    item.completed ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {item.title}
                </p>
                {item.description && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
