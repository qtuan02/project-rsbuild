import { ChevronDown, X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface UtilityFiltersProps {
  onSearch: (value: string) => void;
  onFilterChange: (filterType: string, values: string[]) => void;
  filterOptions: {
    id: string;
    title: string;
    options: {
      label: string;
      value: string;
    }[];
  }[];
}

export const UtilityFilters: React.FC<UtilityFiltersProps> = ({
  onSearch,
  onFilterChange,
  filterOptions,
}) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedFilters, setSelectedFilters] = React.useState<
    Record<string, Set<string>>
  >({});

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearch(value);
  };

  const handleFilterSelect = (filterId: string, value: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (!newFilters[filterId]) {
        newFilters[filterId] = new Set();
      }

      if (newFilters[filterId].has(value)) {
        newFilters[filterId].delete(value);
      } else {
        newFilters[filterId].add(value);
      }

      onFilterChange(filterId, Array.from(newFilters[filterId]));
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setSearchValue("");
    setSelectedFilters({});
    onSearch("");
    filterOptions.forEach((filter) => {
      onFilterChange(filter.id, []);
    });
  };

  const hasActiveFilters =
    searchValue !== "" ||
    Object.values(selectedFilters).some((set) => set.size > 0);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Input
          placeholder="Tìm kiếm phòng, tháng..."
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-xs"
        />

        {filterOptions.map((filter) => (
          <DropdownMenu key={filter.id}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                {filter.title}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>{filter.title}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {filter.options.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  checked={
                    selectedFilters[filter.id]?.has(option.value) ?? false
                  }
                  onCheckedChange={() =>
                    handleFilterSelect(filter.id, option.value)
                  }
                >
                  {option.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="gap-1 text-muted-foreground"
          >
            Xóa bộ lọc
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
