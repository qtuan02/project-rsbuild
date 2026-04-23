import {
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  Wrench,
} from "lucide-react";

import type { TaskPriority, TaskStatus, TaskType } from "@/types/task";

import type { ComponentType } from "react";

interface StatusConfig {
  label: string;
  value: TaskStatus;
  badgeColor: string;
  icon: ComponentType<{ className?: string }>;
}

interface PriorityConfig {
  label: string;
  value: TaskPriority;
  badgeColor: string;
  icon: ComponentType<{ className?: string }>;
}

interface TypeConfig {
  label: string;
  value: TaskType;
  icon: ComponentType<{ className?: string }>;
}

export const taskStatusConfig: Record<TaskStatus, StatusConfig> = {
  open: {
    label: "Mở",
    value: "open",
    badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200",
    icon: Clock,
  },
  in_progress: {
    label: "Đang xử lý",
    value: "in_progress",
    badgeColor:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200",
    icon: Clock,
  },
  done: {
    label: "Hoàn thành",
    value: "done",
    badgeColor:
      "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200",
    icon: CheckCircle2,
  },
};

export const taskPriorityConfig: Record<TaskPriority, PriorityConfig> = {
  high: {
    label: "Cao",
    value: "high",
    badgeColor: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200",
    icon: AlertCircle,
  },
  medium: {
    label: "Trung bình",
    value: "medium",
    badgeColor:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200",
    icon: Clock,
  },
  low: {
    label: "Thấp",
    value: "low",
    badgeColor: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    icon: Clock,
  },
};

export const taskTypeConfig: Record<TaskType, TypeConfig> = {
  invoice_overdue: {
    label: "Hóa đơn quá hạn",
    value: "invoice_overdue",
    icon: FileText,
  },
  contract_expiring: {
    label: "Hợp đồng sắp hết hạn",
    value: "contract_expiring",
    icon: FileText,
  },
  maintenance: {
    label: "Bảo trì",
    value: "maintenance",
    icon: Wrench,
  },
};

export const priorityFilterOptions = Object.values(taskPriorityConfig).map(
  (config) => ({
    label: config.label,
    value: config.value,
    icon: config.icon,
  }),
);

export const statusFilterOptions = Object.values(taskStatusConfig).map(
  (config) => ({
    label: config.label,
    value: config.value,
    icon: config.icon,
  }),
);

export const typeFilterOptions = Object.values(taskTypeConfig).map(
  (config) => ({
    label: config.label,
    value: config.value,
  }),
);
