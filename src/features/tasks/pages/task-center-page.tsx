import { AlertCircle, Clock, Wrench } from "lucide-react";

import { EmptyPanel, LoadingPanel } from "@/components/shared/panels";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/libs/cn";

import { TaskCard } from "../components/task-card";
import { TaskFilters } from "../components/task-filters";
import { useTaskList } from "../hooks/use-task-list";

const taskSummaryConfigs = [
  {
    key: "invoice_overdue" as const,
    label: "Hóa đơn quá hạn",
    icon: AlertCircle,
    color: cn("text-red-600 dark:text-red-400"),
    bg: cn("bg-red-100 dark:bg-red-900/30"),
  },
  {
    key: "contract_expiring" as const,
    label: "Hợp đồng sắp hết hạn",
    icon: Clock,
    color: cn("text-amber-600 dark:text-amber-400"),
    bg: cn("bg-amber-100 dark:bg-amber-900/30"),
  },
  {
    key: "maintenance" as const,
    label: "Bảo trì",
    icon: Wrench,
    color: cn("text-blue-600 dark:text-blue-400"),
    bg: cn("bg-blue-100 dark:bg-blue-900/30"),
  },
];
export const TaskCenterPage = () => {
  const {
    filteredData,
    filterValues,
    filterableColumns,
    onFilterChange,
    onSearchChange,
    searchValue,
    clearFilters,
    taskCountByType,
  } = useTaskList();

  const isLoading = false;

  if (isLoading) {
    return <LoadingPanel />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Trung tâm nhiệm vụ
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Quản lý những nhiệm vụ cần xử lý
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {taskSummaryConfigs.map((config) => (
          <Card key={config.label} size="sm">
            <CardContent className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                  config.bg,
                )}
              >
                <config.icon className={cn("h-4 w-4", config.color)} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{config.label}</p>
                <p className="text-xl font-bold tabular-nums">
                  {taskCountByType[config.key]}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <TaskFilters
          searchValue={searchValue}
          selectedFilters={filterValues}
          onSearch={onSearchChange}
          onFilterChange={onFilterChange}
          onClearFilters={clearFilters}
          filterOptions={filterableColumns}
        />
      </div>

      {filteredData.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredData.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <EmptyPanel
          title="Không có nhiệm vụ"
          description="Tất cả các nhiệm vụ đã được xử lý hoặc không có nhiệm vụ phù hợp"
          action={{
            label: "Xóa bộ lọc",
            onClick: clearFilters,
          }}
        />
      )}
    </div>
  );
};
