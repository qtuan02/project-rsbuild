import {
  FilterToolbar,
  hasActiveSearch,
  hasActiveSelectedFilters,
} from "@/components/shared/filters";

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
  const hasActiveFilters =
    hasActiveSearch(searchValue) || hasActiveSelectedFilters(selectedFilters);

  return (
    <FilterToolbar
      searchFields={[
        {
          id: "search-task",
          placeholder: "Tìm kiếm nhiệm vụ...",
          value: searchValue,
          onChange: onSearch,
        },
      ]}
      facetedFilters={filterOptions.map((filter) => ({
        id: filter.id,
        title: filter.title,
        options: filter.options,
        selectedValues: selectedFilters[filter.id] ?? [],
        onChange: (values) => onFilterChange(filter.id, values),
      }))}
      hasActiveFilters={hasActiveFilters}
      onClearFilters={onClearFilters}
    />
  );
};
