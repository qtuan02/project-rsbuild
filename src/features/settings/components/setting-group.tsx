import { ChevronDown } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/cn";
import type { Setting, SettingCategory } from "@/types/setting";

import { SettingItem } from "./setting-item";
import { settingCategoryConfig } from "../domain/setting-categories";

interface SettingGroupProps {
  category: SettingCategory;
  settings: Setting[];
  defaultOpen?: boolean;
}

export const SettingGroup = ({
  category,
  settings,
  defaultOpen = true,
}: SettingGroupProps) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const config = settingCategoryConfig[category];
  const Icon = config.icon;

  return (
    <div className="space-y-3 rounded-lg border bg-card p-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between transition-colors hover:text-foreground/80"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-foreground">{config.label}</h3>
            <p className="text-xs text-muted-foreground">
              {config.description}
            </p>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div className="space-y-2 pt-2">
          {settings.map((setting) => (
            <SettingItem key={setting.id} setting={setting} />
          ))}
        </div>
      )}
    </div>
  );
};
