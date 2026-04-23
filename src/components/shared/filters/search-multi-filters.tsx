import { ChevronDown, X } from "lucide-react";

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

export interface SearchMultiFiltersOption {
  label: string;
  value: string;
}

export interface SearchMultiFiltersColumn {
  id: string;
  title: string;
  options: SearchMultiFiltersOption[];
}

interface SearchMultiFiltersProps {
  searchPlaceholder: string;
  searchValue: string;
  selectedFilters: Record<string, string[]>;
  filterOptions: SearchMultiFiltersColumn[];
  onSearchChange: (value: string) => void;
  onFilterChange: (filterId: string, values: string[]) => void;
  onClearFilters: () => void;
}

export const SearchMultiFilters = ({
  searchPlaceholder,
  searchValue,
  selectedFilters,
  filterOptions,
  onSearchChange,
  onFilterChange,
  onClearFilters,
}: SearchMultiFiltersProps) => {
  const handleFilterSelect = (filterId: string, value: string) => {
    const currentValues = selectedFilters[filterId] ?? [];
    const nextValues = currentValues.includes(value)
      ? currentValues.filter((currentValue) => currentValue !== value)
      : [...currentValues, value];

    onFilterChange(filterId, nextValues);
  };

  const hasActiveFilters =
    searchValue.trim().length > 0 ||
    Object.values(selectedFilters).some((values) => values.length > 0);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
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
                  checked={selectedFilters[filter.id]?.includes(option.value)}
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
            onClick={onClearFilters}
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
