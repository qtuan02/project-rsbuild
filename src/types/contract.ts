export type ContractStatus = "active" | "ending" | "ended" | "pending";

export const CONTRACT_STATUSES = [
  "active",
  "ending",
  "ended",
  "pending",
] as const;

export interface Contract {
  id: string;
  contractNumber: string;
  tenant: string;
  room: string;
  floor: number;
  rentAmount: number;
  depositAmount?: number;
  startDate: string;
  endDate: string;
  status: ContractStatus;
  lastUpdated: string;
}

export interface ContractStatusConfigItem {
  label: string;
  className: string;
}

export type ContractStatusConfig = Record<
  ContractStatus,
  ContractStatusConfigItem
>;

export const isContractStatus = (value: string): value is ContractStatus =>
  CONTRACT_STATUSES.includes(value as ContractStatus);
