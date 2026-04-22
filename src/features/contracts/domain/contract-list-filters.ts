import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/components/shared/table";
import type { Contract } from "@/types/contract";
import { statusFilterOptions } from "./contract-display-config";

export type ContractSearchColumn = DataTableSearchableColumn<Contract>;
export type ContractFilterColumn = DataTableFilterableColumn<Contract>;

export const contractSearchColumns: ContractSearchColumn[] = [
  {
    id: "contractNumber",
    title: "Số hợp đồng",
    placeholder: "Tìm theo số HĐ...",
  },
  {
    id: "tenant",
    title: "Khách thuê",
    placeholder: "Tìm theo tên khách...",
  },
  {
    id: "room",
    title: "Phòng",
    placeholder: "Tìm theo tên phòng...",
  },
];

export const contractFilterColumns: ContractFilterColumn[] = [
  {
    id: "status",
    title: "Trạng thái",
    options: statusFilterOptions,
  },
];
