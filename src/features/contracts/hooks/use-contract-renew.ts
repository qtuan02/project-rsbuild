import { getContracts } from "../data/contract.repository";

export const useContractRenew = (contractId: string) => {
  const contract = getContracts().find((item) => item.id === contractId);

  return {
    contract,
  };
};
