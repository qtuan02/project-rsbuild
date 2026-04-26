import { Calendar } from "lucide-react";

import { FilterToolbar } from "@/components/shared/filters";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockBuildings } from "@/features/buildings/data/buildings";

import { STATUS_OPTIONS } from "../domain/reports-filters";

const BUILDING_OPTIONS = [
  { value: "all", label: "Tất cả tòa" },
  ...mockBuildings.map((b) => ({ value: b.name, label: b.name })),
];

const FLOOR_OPTIONS = [
  { value: "all", label: "Tất cả tầng" },
  { value: "floor-1", label: "Tầng 1" },
  { value: "floor-2", label: "Tầng 2" },
  { value: "floor-3", label: "Tầng 3" },
  { value: "floor-4", label: "Tầng 4" },
  { value: "floor-5", label: "Tầng 5" },
];

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
  const hasActiveFilters =
    filters.building !== "all" ||
    filters.floor !== "all" ||
    filters.status !== "all";

  return (
    <FilterToolbar
      controls={
        <>
          <Select
            value={filters.building ?? "all"}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, building: value })
            }
          >
            <SelectTrigger className="h-8 w-full sm:w-[150px]">
              <SelectValue placeholder="Tòa" />
            </SelectTrigger>
            <SelectContent>
              {BUILDING_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.floor ?? "all"}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, floor: value })
            }
          >
            <SelectTrigger className="h-8 w-full sm:w-[150px]">
              <SelectValue placeholder="Tầng" />
            </SelectTrigger>
            <SelectContent>
              {FLOOR_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.status ?? "all"}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, status: value })
            }
          >
            <SelectTrigger className="h-8 w-full sm:w-[150px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            className="h-8 w-full justify-start gap-2 sm:w-auto"
          >
            <Calendar className="h-4 w-4" />
            <span>Chọn ngày</span>
          </Button>
        </>
      }
      hasActiveFilters={hasActiveFilters}
      onClearFilters={() => onClearFilters?.()}
    />
  );
};
