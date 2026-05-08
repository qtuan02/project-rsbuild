export interface ComplianceItem {
  id: string;
  tenant: string;
  room: string;
  type: "residence_declaration" | "safety_inspection" | "documentation";
  status: "completed" | "pending" | "overdue";
  dueDate: string;
  completedDate?: string;
}
