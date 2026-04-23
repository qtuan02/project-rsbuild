import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { routeBuilders } from "@/config/routes";
import type { Task } from "@/types/task";

import { taskPriorityUiConfig, taskStatusUiConfig } from "./task-ui-config";
import {
  taskPriorityConfig,
  taskStatusConfig,
  taskTypeConfig,
} from "../domain/task-display-config";

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const navigate = useNavigate();

  const priorityConfig = taskPriorityConfig[task.priority];
  const statusConfig = taskStatusConfig[task.status];
  const typeConfig = taskTypeConfig[task.type];

  const handleViewDetails = () => {
    switch (task.relatedEntity) {
      case "invoice":
        navigate(routeBuilders.invoiceDetail(task.relatedId));
        break;
      case "contract":
        navigate(routeBuilders.contractDetail(task.relatedId));
        break;
      case "room":
        navigate(routeBuilders.roomDetail(task.relatedId));
        break;
      case "tenant":
        navigate(routeBuilders.tenantDetail(task.relatedId));
        break;
    }
  };

  const daysUntilDue = Math.ceil(
    (new Date(task.dueDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="line-clamp-2 text-base">
              {task.title}
            </CardTitle>
            <CardDescription className="mt-1 line-clamp-2">
              {task.description}
            </CardDescription>
          </div>
          <div
            className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${taskPriorityUiConfig[task.priority].badgeClassName}`}
          >
            {priorityConfig.label}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        {/* Task Type & Status */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200">
            {typeConfig.label}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${taskStatusUiConfig[task.status].badgeClassName}`}
          >
            {statusConfig.label}
          </span>
        </div>

        {/* Due Date */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Hạn:</span>
          <span
            className={
              daysUntilDue < 0 ? "text-red-600 font-medium" : "text-foreground"
            }
          >
            {daysUntilDue < 0
              ? `Quá hạn ${Math.abs(daysUntilDue)} ngày`
              : daysUntilDue === 0
                ? "Hôm nay"
                : `Còn ${daysUntilDue} ngày`}
          </span>
        </div>

        {/* Actions */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleViewDetails}
          className="w-full"
        >
          Xem chi tiết
        </Button>
      </CardContent>
    </Card>
  );
};
