import type { ComponentType } from "react";

export interface SharedFilterOption {
  label: string;
  value: string;
  icon?: ComponentType<{ className?: string }>;
}

export interface SharedSearchableColumn<TId extends string = string> {
  id: TId;
  title: string;
}

export interface SharedFilterableColumn<TId extends string = string> {
  id: TId;
  title: string;
  options: SharedFilterOption[];
}

export const hasActiveSearch = (value: string): boolean =>
  value.trim().length > 0;

export const hasActiveSelectedFilters = (
  selectedFilters: Record<string, string[]>,
): boolean =>
  Object.values(selectedFilters).some((values) => values.length > 0);
