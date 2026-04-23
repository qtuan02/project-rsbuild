import { Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  BUILDING_OPTIONS,
  FLOOR_OPTIONS,
  STATUS_OPTIONS,
} from "../domain/reports-filters";

import type { ReportFilterParams } from "../domain/reports-filter-params";

interface ReportFiltersProps {
  filters: ReportFilterParams;
  onFiltersChange: (filters: ReportFilterParams) => void;
  onClearFilters?: () => void;
}

export const ReportFilters = ({
  filters,
  onFiltersChange,
  onClearFilters,
}: ReportFiltersProps) => {
  return (
    <div className="space-y-4 rounded-lg border bg-card p-4">
      <h3 className="text-sm font-semibold">Bộ lọc báo cáo</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Tòa</label>
          <Select
            value={filters.building ?? "all"}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, building: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {BUILDING_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tầng</label>
          <Select
            value={filters.floor ?? "all"}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, floor: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FLOOR_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Trạng thái</label>
          <Select
            value={filters.status ?? "all"}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, status: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Khoảng thời gian</label>
          <Button variant="outline" className="w-full justify-start gap-2">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">Chọn ngày</span>
          </Button>
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={() => onClearFilters?.()}
        >
          Xóa bộ lọc
        </Button>
        <Button size="sm" variant="default">
          Xuất báo cáo
        </Button>
      </div>
    </div>
  );
};
