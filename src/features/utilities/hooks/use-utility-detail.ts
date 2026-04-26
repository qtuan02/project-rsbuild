import { getUtilityById } from "../data/utility.repository";

interface UseUtilityDetailOptions {
  utilityId?: string;
}

export const useUtilityDetail = ({ utilityId }: UseUtilityDetailOptions) => {
  if (!utilityId) {
    return {
      isLoading: false,
      utility: undefined,
      error: "Invalid utility ID",
    };
  }

  try {
    const utility = getUtilityById(utilityId);
    if (!utility) {
      return {
        isLoading: false,
        utility: undefined,
        error: "Utility not found",
      };
    }

    return {
      isLoading: false,
      utility,
      error: null,
    };
  } catch {
    return {
      isLoading: false,
      utility: undefined,
      error: "Error loading utility",
    };
  }
};
