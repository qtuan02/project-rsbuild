import {
  SearchMultiFilters,
  type SearchMultiFiltersColumn,
} from "@/components/shared/filters/search-multi-filters";

interface TaskFiltersProps {
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

export const TaskFilters = ({
  searchValue,
  selectedFilters,
  onSearch,
  onFilterChange,
  onClearFilters,
  filterOptions,
}: TaskFiltersProps) => {
  const tableFilterOptions: SearchMultiFiltersColumn[] = filterOptions;
  return (
    <SearchMultiFilters
      searchPlaceholder="Tìm kiếm nhiệm vụ..."
      searchValue={searchValue}
      selectedFilters={selectedFilters}
      filterOptions={tableFilterOptions}
      onSearchChange={onSearch}
      onFilterChange={onFilterChange}
      onClearFilters={onClearFilters}
    />
  );
};
