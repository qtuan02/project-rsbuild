export type TaskType = "invoice_overdue" | "contract_expiring" | "maintenance";
export type TaskPriority = "high" | "medium" | "low";
export type TaskStatus = "open" | "in_progress" | "done";
export type RelatedEntityType = "invoice" | "contract" | "room" | "tenant";

export interface Task {
  id: string;
  type: TaskType;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  relatedEntity: RelatedEntityType;
  relatedId: string;
  dueDate: string;
  createdAt: string;
}
