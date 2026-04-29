import { useNavigate } from "react-router-dom";

import { EntityListCard } from "@/components/shared/cards";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { routePathBuilders } from "@/config/routes";
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
        navigate(routePathBuilders.invoiceDetail(task.relatedId));
        break;
      case "contract":
        navigate(routePathBuilders.contractDetail(task.relatedId));
        break;
      case "room":
        navigate(routePathBuilders.roomDetail(task.relatedId));
        break;
      case "tenant":
        navigate(routePathBuilders.tenantDetail(task.relatedId));
        break;
    }
  };

  const daysUntilDue = Math.ceil(
    (new Date(task.dueDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );

  return (
    <EntityListCard
      className="hover:cursor-pointer"
      onClick={handleViewDetails}
      header={
        <CardHeader className="pb-0">
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
      }
      content={
        <CardContent className="flex-1 space-y-4">
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

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Hạn:</span>
            <span
              className={
                daysUntilDue < 0
                  ? "text-red-600 font-medium"
                  : "text-foreground"
              }
            >
              {daysUntilDue < 0
                ? `Quá hạn ${Math.abs(daysUntilDue)} ngày`
                : daysUntilDue === 0
                  ? "Hôm nay"
                  : `Còn ${daysUntilDue} ngày`}
            </span>
          </div>
        </CardContent>
      }
    />
  );
};
