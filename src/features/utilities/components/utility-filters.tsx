import {
  SearchMultiFilters,
  type SearchMultiFiltersColumn,
} from "@/components/shared/filters/search-multi-filters";

interface UtilityFiltersProps {
  searchValue: string;
  selectedFilters: Record<string, string[]>;
  onSearch: (value: string) => void;
  onFilterChange: (filterType: string, values: string[]) => void;
  onClearFilters: () => void;
  filterOptions: {
    id: string;
    title: string;
    options: {
      label: string;
      value: string;
    }[];
  }[];
}

export const UtilityFilters = ({
  searchValue,
  selectedFilters,
  onSearch,
  onFilterChange,
  onClearFilters,
  filterOptions,
}: UtilityFiltersProps) => {
  const tableFilterOptions: SearchMultiFiltersColumn[] = filterOptions;
  return (
    <SearchMultiFilters
      searchPlaceholder="Tìm kiếm phòng, tháng..."
      searchValue={searchValue}
      selectedFilters={selectedFilters}
      filterOptions={tableFilterOptions}
      onSearchChange={onSearch}
      onFilterChange={onFilterChange}
      onClearFilters={onClearFilters}
    />
  );
};
