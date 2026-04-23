import { Plus, Activity, AlertCircle, Clock } from "lucide-react";

import { SummaryCard } from "@/components/shared/cards/summary-card";
import { EmptyPanel, LoadingPanel } from "@/components/shared/panels";
import { DataTable } from "@/components/shared/table/data-table";
import { Button } from "@/components/ui/button";

import { utilityColumns } from "../components/utility-columns";
import { UtilityFilters } from "../components/utility-filters";
import { useUtilityList } from "../hooks/use-utility-list";

export const UtilityListPage = () => {
  const {
    filteredData,
    filterValues,
    filterableColumns,
    onFilterChange,
    onSearchChange,
    searchValue,
    clearFilters,
    stats,
  } = useUtilityList();

  const isLoading = false;

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
          searchValue={searchValue}
          selectedFilters={filterValues}
          onSearch={onSearchChange}
          onFilterChange={onFilterChange}
          onClearFilters={clearFilters}
          filterOptions={filterableColumns}
        />
      </div>

      {/* Table */}
      {filteredData.length > 0 ? (
        <DataTable columns={utilityColumns} data={filteredData} />
      ) : (
        <EmptyPanel
          title="Không có dữ liệu"
          description="Chưa có chỉ số nào được thêm"
          action={{
            label: "Xóa bộ lọc",
            onClick: clearFilters,
          }}
        />
      )}
    </div>
  );
};
