export type SettingCategory = "building" | "rent" | "notification" | "billing";

export type SettingType = "text" | "number" | "toggle" | "select";

export const SETTING_CATEGORIES = [
  "building",
  "rent",
  "notification",
  "billing",
] as const;

export interface Setting {
  id: string;
  category: SettingCategory;
  key: string;
  label: string;
  value: string | number | boolean;
  description?: string;
  type: SettingType;
  updated: string;
}

export interface SettingCategoryConfigItem {
  label: string;
  icon: string;
  description: string;
}

export type SettingCategoryConfig = Record<
  SettingCategory,
  SettingCategoryConfigItem
>;

export const isSettingCategory = (value: string): value is SettingCategory =>
  SETTING_CATEGORIES.includes(value as SettingCategory);
