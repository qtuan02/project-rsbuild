import type { Task } from "@/types/task";

import { mockTasks } from "./task.mock";

export const getTasks = (): Task[] => [...mockTasks];
