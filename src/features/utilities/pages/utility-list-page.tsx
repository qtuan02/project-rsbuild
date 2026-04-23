import { Plus, Activity, AlertCircle, Clock } from "lucide-react";
import * as React from "react";

import { SummaryCard } from "@/components/shared/cards/summary-card";
import { EmptyPanel, LoadingPanel } from "@/components/shared/panels";
import { DataTable } from "@/components/shared/table/data-table";
import { Button } from "@/components/ui/button";

import { createUtilityColumns } from "../components/utility-columns";
import { UtilityFilters } from "../components/utility-filters";
import { calculateUtilityStats } from "../domain/utility-stats";
import { useUtilityList } from "../hooks/use-utility-list";

export const UtilityListPage: React.FC = () => {
  const { data, filterableColumns } = useUtilityList();

  const [isLoading] = React.useState(false);
  const [filteredData, setFilteredData] = React.useState(data);
  const [searchValue, setSearchValue] = React.useState("");
  const [filterValues, setFilterValues] = React.useState<
    Record<string, string[]>
  >({});

  React.useEffect(() => {
    let result = data;

    if (searchValue) {
      result = result.filter((item) => {
        const searchLower = searchValue.toLowerCase();
        return (
          item.roomName.toLowerCase().includes(searchLower) ||
          item.month.includes(searchValue)
        );
      });
    }

    Object.entries(filterValues).forEach(([key, values]) => {
      if (values.length > 0) {
        result = result.filter((item) => {
          const itemValue = item[key as keyof typeof item];
          return values.includes(String(itemValue));
        });
      }
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilteredData(result);
  }, [data, searchValue, filterValues]);

  const stats = calculateUtilityStats(data);
  const columns = createUtilityColumns();

  if (isLoading) {
    return <LoadingPanel />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tiện ích</h1>
          <p className="text-sm text-muted-foreground">
            Quản lý chỉ số điện nước và tiêu thụ
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Thêm chỉ số
        </Button>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          label="Tổng chỉ số"
          value={stats.totalReadings.toString()}
          icon={Activity}
        />
        <SummaryCard
          label="Bất thường"
          value={stats.anomalyCount.toString()}
          icon={AlertCircle}
          bgColor="bg-red-100"
          iconColor="text-red-600"
        />
        <SummaryCard
          label="Chờ xác minh"
          value={stats.pendingVerifyCount.toString()}
          icon={Clock}
          bgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
      </div>

      {/* Filters */}
      <div>
        <UtilityFilters
          onSearch={setSearchValue}
          onFilterChange={(key, values) => {
            setFilterValues((prev) => ({
              ...prev,
              [key]: values,
            }));
          }}
          filterOptions={filterableColumns}
        />
      </div>

      {/* Table */}
      {filteredData.length > 0 ? (
        <div className="rounded-lg border">
          <DataTable columns={columns} data={filteredData} />
        </div>
      ) : (
        <EmptyPanel
          title="Không có dữ liệu"
          description="Chưa có chỉ số nào được thêm"
          action={{
            label: "Thêm chỉ số đầu tiên",
            onClick: () => console.log("Add utility"),
          }}
        />
      )}
    </div>
  );
};
