import { EmptyPanel, LoadingPanel } from "@/components/shared/panels";

import { TaskCard } from "../components/task-card";
import { TaskFilters } from "../components/task-filters";
import { useTaskList } from "../hooks/use-task-list";

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
            {taskCountByType.invoice_overdue}
          </span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 bg-orange-50 dark:bg-orange-950/20">
          <span className="text-sm font-medium">Hợp đồng sắp hết hạn:</span>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-200 dark:bg-orange-800 text-xs font-bold text-orange-800 dark:text-orange-200">
            {taskCountByType.contract_expiring}
          </span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 bg-blue-50 dark:bg-blue-950/20">
          <span className="text-sm font-medium">Bảo trì:</span>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-200 dark:bg-blue-800 text-xs font-bold text-blue-800 dark:text-blue-200">
            {taskCountByType.maintenance}
          </span>
        </div>
      </div>

      {/* Filters */}
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
            onClick: clearFilters,
          }}
        />
      )}
    </div>
  );
};
