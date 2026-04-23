import type { Task } from "@/types/task";

import { mockTasks } from "./task.mock";

export const getTasks = (): Task[] => mockTasks;

export const getTaskById = (id: string): Task | undefined =>
  mockTasks.find((t) => t.id === id);
