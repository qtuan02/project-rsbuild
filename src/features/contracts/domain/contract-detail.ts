import type { Contract } from "@/types/contract";

const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
const EXPIRING_SOON_DAYS = 30;

const toIsoDate = (value: string): string =>
  value.split("/").reverse().join("-");

export interface ContractExpiryMeta {
  daysUntilEnd: number;
  isExpiringSoon: boolean;
}

export const getContractExpiryMeta = (
  contract: Contract,
  now: Date = new Date(),
): ContractExpiryMeta => {
  const endDate = new Date(toIsoDate(contract.endDate));
  const daysUntilEnd = Math.floor(
    (endDate.getTime() - now.getTime()) / DAY_IN_MILLISECONDS,
  );

  return {
    daysUntilEnd,
    isExpiringSoon: daysUntilEnd <= EXPIRING_SOON_DAYS && daysUntilEnd > 0,
  };
};
