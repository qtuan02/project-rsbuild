import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  getCommunicationSendLogs,
  getCommunicationTemplates,
} from "../data/communications.repository";
import {
  filterSendLogs,
  type CommunicationsLogFilterState,
} from "../domain/communications-filters";

import type { NotificationTemplate } from "../data/communications.mock";

export const useCommunications = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTenant, setSearchTenant] = useState("");
  const [filterChannel, setFilterChannel] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
      } catch {
        if (!cancelled) {
          setError("Không thể tải dữ liệu liên lạc.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const templates = useMemo(() => getCommunicationTemplates(), []);
  const sendLogs = useMemo(() => getCommunicationSendLogs(), []);

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
    isLoading,
    error,
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
