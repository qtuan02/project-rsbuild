import * as React from "react";

import { EmptyPanel, LoadingPanel } from "@/components/shared/panels";

import { TaskCard } from "../components/task-card";
import { TaskFilters } from "../components/task-filters";
import { useTaskList } from "../hooks/use-task-list";

export const TaskCenterPage: React.FC = () => {
  const { data, filterableColumns } = useTaskList();

  const [isLoading] = React.useState(false);
  const [filteredData, setFilteredData] = React.useState(data);
  const [searchValue, setSearchValue] = React.useState("");
  const [filterValues, setFilterValues] = React.useState<
    Record<string, string[]>
  >({});

  React.useEffect(() => {
    let result = data;

    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower),
      );
    }

    Object.entries(filterValues).forEach(([key, values]) => {
      if (values.length > 0) {
        result = result.filter((item) => {
          const itemValue = item[key as keyof typeof item];
          return values.includes(String(itemValue));
        });
      }
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilteredData(result);
  }, [data, searchValue, filterValues]);

  // Count tasks by type
  const invoiceOverdueTasks = data.filter(
    (t) => t.type === "invoice_overdue",
  ).length;
  const contractExpiringTasks = data.filter(
    (t) => t.type === "contract_expiring",
  ).length;
  const maintenanceTasks = data.filter((t) => t.type === "maintenance").length;

  if (isLoading) {
    return <LoadingPanel />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Trung tâm nhiệm vụ
        </h1>
        <p className="text-sm text-muted-foreground">
          Quản lý những nhiệm vụ cần xử lý
        </p>
      </div>

      {/* Task Count Badges */}
      <div className="flex flex-wrap gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 bg-red-50 dark:bg-red-950/20">
          <span className="text-sm font-medium">Hóa đơn quá hạn:</span>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-200 dark:bg-red-800 text-xs font-bold text-red-800 dark:text-red-200">
            {invoiceOverdueTasks}
          </span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 bg-orange-50 dark:bg-orange-950/20">
          <span className="text-sm font-medium">Hợp đồng sắp hết hạn:</span>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-200 dark:bg-orange-800 text-xs font-bold text-orange-800 dark:text-orange-200">
            {contractExpiringTasks}
          </span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 bg-blue-50 dark:bg-blue-950/20">
          <span className="text-sm font-medium">Bảo trì:</span>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-200 dark:bg-blue-800 text-xs font-bold text-blue-800 dark:text-blue-200">
            {maintenanceTasks}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div>
        <TaskFilters
          onSearch={setSearchValue}
          onFilterChange={(key, values) => {
            setFilterValues((prev) => ({
              ...prev,
              [key]: values,
            }));
          }}
          filterOptions={filterableColumns}
        />
      </div>

      {/* Tasks Grid */}
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
            onClick: () => {
              setSearchValue("");
              setFilterValues({});
            },
          }}
        />
      )}
    </div>
  );
};
