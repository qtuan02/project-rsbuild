import type { Contract, ContractStatus } from "@/types/contract";

import { statusFilterOptions } from "./contract-display-config";

import type { LucideIcon } from "lucide-react";

export interface ContractSearchColumn {
  id: keyof Pick<Contract, "contractNumber" | "tenant" | "room"> & string;
  title: string;
}

export interface ContractFilterColumn {
  id: "status";
  title: string;
  options: {
    label: string;
    value: ContractStatus;
    icon?: LucideIcon;
  }[];
}

export const contractSearchColumns: ContractSearchColumn[] = [
  { id: "contractNumber", title: "số hợp đồng" },
  { id: "tenant", title: "khách thuê" },
  { id: "room", title: "phòng" },
];

export const contractFilterColumns: ContractFilterColumn[] = [
  {
    id: "status",
    title: "Trạng thái",
    options: statusFilterOptions,
  },
];
