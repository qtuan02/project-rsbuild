import type { TaskPriority, TaskStatus } from "@/types/task";

interface TaskBadgeUiConfig {
  badgeClassName: string;
}

export const taskStatusUiConfig: Record<TaskStatus, TaskBadgeUiConfig> = {
  open: {
    badgeClassName:
      "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200",
  },
  in_progress: {
    badgeClassName:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200",
  },
  done: {
    badgeClassName:
      "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200",
  },
};

export const taskPriorityUiConfig: Record<TaskPriority, TaskBadgeUiConfig> = {
  high: {
    badgeClassName: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200",
  },
  medium: {
    badgeClassName:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200",
  },
  low: {
    badgeClassName:
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  },
};
