import {
  CheckCircle2,
  Clock,
  Download,
  LayoutGrid,
  Plus,
  UserCheck,
  Users,
} from "lucide-react";

import { Pagination } from "@/components/shared/pagination";
import { EmptyPanel } from "@/components/shared/panels";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/cn";

import { TenantCard } from "../components/tenant-card";
import { TenantFilters } from "../components/tenant-filters";
import { useTenantList } from "../hooks/use-tenant-list";

const summaryStatConfigs = [
  {
    key: "total",
    label: "Tổng khách",
    icon: Users,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    key: "active",
    label: "Đang thuê",
    icon: UserCheck,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  {
    key: "pending",
    label: "Chờ vào",
    icon: Clock,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    key: "overdue",
    label: "Nợ cước",
    icon: CheckCircle2,
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-100 dark:bg-red-900/30",
  },
] as const;

export const TenantListPage = () => {
  const {
    search,
    statusFilter,
    floorFilter,
    currentPage,
    pageSize,
    totalPages,
    activeFilterCount,
    filteredCount,
    paginatedTenants,
    summaryStats,
    onSearchChange,
    onStatusFilterValueChange,
    onFloorFilterValueChange,
    onPageChange,
    onPageSizeChange,
    clearFilters,
  } = useTenantList();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Quản lý khách thuê
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Theo dõi thông tin, trạng thái và hợp đồng của tất cả khách thuê.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Xuất Excel
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Thêm khách
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {summaryStatConfigs.map((config) => (
          <Card key={config.label} size="sm">
            <CardContent className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                  config.bg,
                )}
              >
                <config.icon className={cn("h-4 w-4", config.color)} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{config.label}</p>
                <p className="text-xl font-bold tabular-nums">
                  {summaryStats[config.key]}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <TenantFilters
        search={search}
        onSearchChange={onSearchChange}
        statusFilter={statusFilter}
        onStatusFilterValueChange={onStatusFilterValueChange}
        floorFilter={floorFilter}
        onFloorFilterValueChange={onFloorFilterValueChange}
        activeFilterCount={activeFilterCount}
        onClearFilters={clearFilters}
      />

      <div className="flex items-center gap-2">
        <LayoutGrid className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          {filteredCount} khách thuê
        </span>
        {activeFilterCount > 0 && (
          <Badge variant="secondary" className="text-xs">
            {activeFilterCount} bộ lọc đang áp dụng
          </Badge>
        )}
      </div>

      {paginatedTenants.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {paginatedTenants.map((tenant) => (
            <TenantCard key={tenant.id} tenant={tenant} />
          ))}
        </div>
      ) : (
        <EmptyPanel
          icon={Users}
          title="Không tìm thấy khách thuê"
          description="Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để xem thêm kết quả."
          action={{ label: "Xóa bộ lọc", onClick: clearFilters }}
        />
      )}

      {filteredCount > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={filteredCount}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </div>
  );
};
