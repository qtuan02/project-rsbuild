import type { TaskPriority, TaskStatus, TaskType } from "@/types/task";

interface StatusConfig {
  label: string;
  value: TaskStatus;
}

interface PriorityConfig {
  label: string;
  value: TaskPriority;
}

interface TypeConfig {
  label: string;
  value: TaskType;
}

export const taskStatusConfig: Record<TaskStatus, StatusConfig> = {
  open: {
    label: "Mở",
    value: "open",
  },
  in_progress: {
    label: "Đang xử lý",
    value: "in_progress",
  },
  done: {
    label: "Hoàn thành",
    value: "done",
  },
};

export const taskPriorityConfig: Record<TaskPriority, PriorityConfig> = {
  high: {
    label: "Cao",
    value: "high",
  },
  medium: {
    label: "Trung bình",
    value: "medium",
  },
  low: {
    label: "Thấp",
    value: "low",
  },
};

export const taskTypeConfig: Record<TaskType, TypeConfig> = {
  invoice_overdue: {
    label: "Hóa đơn quá hạn",
    value: "invoice_overdue",
  },
  contract_expiring: {
    label: "Hợp đồng sắp hết hạn",
    value: "contract_expiring",
  },
  maintenance: {
    label: "Bảo trì",
    value: "maintenance",
  },
};

export const priorityFilterOptions = Object.values(taskPriorityConfig).map(
  (config) => ({
    label: config.label,
    value: config.value,
  }),
);

export const statusFilterOptions = Object.values(taskStatusConfig).map(
  (config) => ({
    label: config.label,
    value: config.value,
  }),
);

export const typeFilterOptions = Object.values(taskTypeConfig).map(
  (config) => ({
    label: config.label,
    value: config.value,
  }),
);
