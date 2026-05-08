import type { SendLog } from "@/types/communications";

export interface CommunicationsLogFilterState {
  searchTenant: string;
  channel: string;
  status: string;
}

export const filterSendLogs = (
  logs: SendLog[],
  filterState: CommunicationsLogFilterState,
): SendLog[] => {
  const normalizedSearch = filterState.searchTenant.trim().toLowerCase();

  return logs.filter((log) => {
    if (filterState.channel !== "all" && log.channel !== filterState.channel) {
      return false;
    }
    if (filterState.status !== "all" && log.status !== filterState.status) {
      return false;
    }
    if (
      normalizedSearch &&
      !log.tenant.toLowerCase().includes(normalizedSearch)
    ) {
      return false;
    }
    return true;
  });
};
