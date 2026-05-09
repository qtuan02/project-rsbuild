import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

import type { NotificationTemplate } from "@/types/communications";

import { getCommunicationsDashboardData } from "../data/communications.repository";
import {
  filterSendLogs,
  type CommunicationsLogFilterState,
} from "../domain/communications-filters";
export const useCommunications = () => {
  const [searchTenant, setSearchTenant] = useState("");
  const [filterChannel, setFilterChannel] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const dashboardQuery = useQuery({
    queryKey: ["communications", "dashboard"],
    queryFn: getCommunicationsDashboardData,
  });

  const templates = useMemo(
    () => dashboardQuery.data?.templates ?? [],
    [dashboardQuery.data?.templates],
  );
  const sendLogs = useMemo(
    () => dashboardQuery.data?.sendLogs ?? [],
    [dashboardQuery.data?.sendLogs],
  );

  const filterState = useMemo<CommunicationsLogFilterState>(
    () => ({
      searchTenant,
      channel: filterChannel,
      status: filterStatus,
    }),
    [filterChannel, filterStatus, searchTenant],
  );

  const filteredLogs = useMemo(
    () => filterSendLogs(sendLogs, filterState),
    [filterState, sendLogs],
  );

  const clearLogFilters = useCallback(() => {
    setSearchTenant("");
    setFilterChannel("all");
    setFilterStatus("all");
  }, []);

  const handleSendTemplate = useCallback((template: NotificationTemplate) => {
    toast.success("Đã mô phỏng gửi thông báo", {
      description: template.name,
    });
  }, []);

  return {
    isLoading: dashboardQuery.isLoading,
    retry: dashboardQuery.refetch,
    error: dashboardQuery.error ? "Không thể tải dữ liệu liên lạc." : null,
    templates,
    sendLogs,
    filteredLogs,
    searchTenant,
    setSearchTenant,
    filterChannel,
    setFilterChannel,
    filterStatus,
    setFilterStatus,
    clearLogFilters,
    handleSendTemplate,
  };
};
