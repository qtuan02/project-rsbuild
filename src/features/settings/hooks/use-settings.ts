import * as React from "react";

import type { Setting, SettingCategory } from "@/types/setting";

import { getSettings } from "../data/setting.repository";
import { settingCategoryOrder } from "../domain/setting-categories";

export interface UseSettingsResult {
  settingsByCategory: Record<SettingCategory, Setting[]>;
  categoryOrder: SettingCategory[];
}

export const useSettings = (): UseSettingsResult => {
  const settings = React.useMemo(() => getSettings(), []);

  const settingsByCategory = React.useMemo(() => {
    const grouped: Record<SettingCategory, Setting[]> = {
      building: [],
      rent: [],
      notification: [],
      billing: [],
    };

    settings.forEach((setting) => {
      grouped[setting.category].push(setting);
    });

    return grouped;
  }, [settings]);

  return {
    settingsByCategory,
    categoryOrder: settingCategoryOrder,
  };
};
